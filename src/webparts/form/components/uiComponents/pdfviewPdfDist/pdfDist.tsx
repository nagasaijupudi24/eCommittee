/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IPDFViewerProps } from './IPDFViewerProps';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import styles from './PdfViewer.module.scss';
import { Icon } from '@fluentui/react';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFViewer: React.FC<IPDFViewerProps> = (props) => {
  const {pdfPath,noteNumber} = props
  const pdfViewerRef = useRef<HTMLDivElement>(null);
  // const [isPDFFullWidth, setIsPDFFullWidth] = useState(false);
  const [pdfDocument, setPdfDocument] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pageCanvas, setPageCanvas] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdf = async (): Promise<void> => {
      const loadingTask = pdfjsLib.getDocument(pdfPath);
      const pdf = await loadingTask.promise;
      setPdfDocument(pdf);
      setNumPages(pdf.numPages);
    };
    fetchPdf().catch(console.error);
  }, [pdfPath]);

  useEffect(() => {
    const renderPage = async (pageNum: number): Promise<void> => {
      if (!pdfDocument) return;
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale: zoomLevel });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        setPageCanvas(canvas.toDataURL());
      }
    };

    renderPage(currentPage).catch(console.error);
  }, [pdfDocument, currentPage, zoomLevel]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom * 1.25);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => prevZoom * 0.75);
  };

  const handleZoomChange = (event: any) => {
    const selectedZoom = parseFloat(event.target.value);
    setZoomLevel(selectedZoom);
  };

  const handlePrint = () => {
    window.print();
  };

  // const handleSave = () => {
  //   const a = document.createElement('a');
  //   a.href = pdfPath;
  //   a.download = 'document.pdf';
  //   a.click();
  // };


  const handleSave = () => {
    const a = document.createElement('a');
    a.href = pdfPath;
    a.download = `${noteNumber}.pdf`; // Use the custom name here
    a.click();
    
  };

  const customStyles = {
    dialogAlignment: { margin: "25px", textAlign: "center", width: "500px" },
    // pdfViewer: { overflowY: 'scroll', height: '81vh', border: '1px solid #00000014' },
    pdfDiv: { boxShadow: '0 6px 8px #00000014, 0 4px 16px #0000001f', alignContent: "center", margin: "10px auto", display: "table" }
  }

  return (
    <div >
      {/* {isPDFFullWidth ?
        <span className="k-icon k-font-icon k-i-fullscreen-exit k-i-full-screen-exit cursor pdfHideandShowIcons" onClick={() => setIsPDFFullWidth(!isPDFFullWidth)}></span> :
        <span className="k-icon k-font-icon k-i-fullscreen k-i-full-screenk-i-fullscreen-enter cursor pdfHideandShowIcons" onClick={() => setIsPDFFullWidth(!isPDFFullWidth)}></span>} */}

      <div className={styles.toolbar}>
        <div id={styles.toolbarContainer}>
          <div id={styles.toolbarViewer}>
            <div id={styles.toolbarViewerLeft}>
              <button className={styles.toolbarButton} title="Previous Page" id="previous" disabled={currentPage <= 1} onClick={handlePreviousPage}>
                <span><Icon iconName="ChevronLeft" /></span>
              </button>
              <button className={styles.toolbarButton} title="Next Page" id="next" disabled={currentPage >= numPages} onClick={handleNextPage}>
                <span><Icon iconName="ChevronRight" /></span>
              </button>
              <span className={styles.toolbarLabel}>{currentPage} / {numPages}</span>
            </div>

            <div id={styles.toolbarViewerMiddle}>
              <div className={`${styles.splitToolbarButton}`}>
                <button id="zoomOut" className={`${styles.toolbarButton}`} title="Zoom Out" onClick={handleZoomOut}>
                  <span><Icon iconName="ZoomOut" /></span>
                </button>
                <button id="zoomIn" className={`${styles.toolbarButton}`} title="Zoom In" onClick={handleZoomIn}>
                  <span><Icon iconName="ZoomIn" /></span>
                </button>
              </div>

              <span id="scaleSelectContainer" className={`${styles.dropdownToolbarButton}`}>
                <select id="scaleSelect" title="Zoom" value={zoomLevel.toString()} onChange={handleZoomChange}>
                  <option value="1.3">Actual Width</option>
                  <option value="1.2">Fit to Width</option>
                  <option value="1.1">Fit to Page</option>
                  <option value="0.5">50%</option>
                  <option value="0.75">75%</option>
                  <option value="1">100%</option>
                  <option value="1.25">125%</option>
                  <option value="1.5">150%</option>
                  <option value="2">200%</option>
                  <option value="3">300%</option>
                  <option value="4">400%</option>
                </select>
              </span>
            </div>
            <div id={styles.toolbarViewerRight}>
              <div id="editorModeSeparator" className="verticalToolbarSeparator"></div>
              <button onClick={handlePrint} id="print" className={`${styles.toolbarButton}`} title="Print" data-l10n-id="pdfjs-print-button">
                <Icon iconName="Print" />
              </button>
              <button id="download" className={`${styles.toolbarButton}`} title="Download" data-l10n-id="pdfjs-save-button" onClick={handleSave}>
                <Icon iconName="Download" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pdfviewer} ref={pdfViewerRef}>
        {pageCanvas && (
          <div style={customStyles.pdfDiv}>
            <img src={pageCanvas} alt={`Page ${currentPage}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;




// /* eslint-disable react/self-closing-comp */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import * as React from 'react';
// import { useEffect, useRef, useState } from 'react';
// import { IPDFViewerProps } from './IPDFViewerProps';
// import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// // import styles from '../../Form.module.scss';
// // import { Icon } from '@fluentui/react';
// import styles from './PdfViewer.module.scss';
// import { Icon } from '@fluentui/react';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const PDFViewer: React.FC<IPDFViewerProps> = ({ pdfPath }) => {
//   const pdfViewerRef = useRef<HTMLDivElement>(null);
//   const [isPDFFullWidth, setIsPDFFullWidth] = useState(false);
//   const [pdfDocument, setPdfDocument] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [numPages, setNumPages] = useState<number>(0);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   // const [fitToPage, setFitToPage] = useState(false);
//   const [pages, setPages] = useState<{ pageNum: number; canvas: string }[]>([]);
//   const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const fetchPdf = async (): Promise<void> => {
//       const loadingTask = pdfjsLib.getDocument(pdfPath);
//       const pdf = await loadingTask.promise;
//       setPdfDocument(pdf);
//     };
//     fetchPdf().catch(console.error);
//   }, [pdfPath]);

//   useEffect(() => {
//     const renderAllPages = async (pdf: pdfjsLib.PDFDocumentProxy): Promise<void> => {
//       const renderedPages: { pageNum: number; canvas: string }[] = [];
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const viewport = page.getViewport({ scale: zoomLevel });
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         if (context) {
//           canvas.height = viewport.height;
//           canvas.width = viewport.width;
//           await page.render({ canvasContext: context, viewport: viewport }).promise;
//           renderedPages.push({ pageNum: i, canvas: canvas.toDataURL() });
//         }
//       }
//       setPages(renderedPages);
//     };

//     if (pdfDocument) {
//       renderAllPages(pdfDocument).catch(console.error);
//       setNumPages(pdfDocument.numPages);
//     }

//     const throttle = (func: (...args: unknown[]) => void, limit: number): (() => void) => {
//       let inThrottle: boolean;
//       return function (this: unknown, ...args: unknown[]): void {
//         if (!inThrottle) {
//           func.apply(this, args);
//           inThrottle = true;
//           setTimeout(() => (inThrottle = false), limit);
//         }
//       };
//     };

//     const handleScroll = throttle(() => {
//       const pdfViewer = pdfViewerRef.current;
//       if (!pdfViewer) return;
//       const scrollTop = pdfViewer.scrollTop;
//       const pageHeight = pdfViewer.scrollHeight / numPages;
//       const newPage = Math.floor(scrollTop / pageHeight) + 1;
//       if (newPage !== currentPage) {
//         setCurrentPage(newPage);
//         if (pdfDocument) {
//           renderAllPages(pdfDocument).catch(console.error);
//         }
//       }
//     }, 200);

//     const pdfViewer = pdfViewerRef.current;
//     if (pdfViewer) {
//       pdfViewer.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (pdfViewer) {
//         pdfViewer.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [pdfDocument, zoomLevel, currentPage, numPages]);

//   // const handlePreviousPage = () => {
//   //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   // };

//   // const handleNextPage = () => {
//   //   setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
//   // };

//   const handleZoomIn = () => {
//     setZoomLevel((prevZoom) => prevZoom * 1.25);
//   };

//   const handleZoomOut = () => {
//     setZoomLevel((prevZoom) => prevZoom * 0.75);
//   };

//   const handleZoomChange = (event:any) => {
//     const selectedZoom = parseFloat(event.target.value);
//     setZoomLevel(selectedZoom);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleSave = () => {
//     const a = document.createElement('a');
//     a.href = pdfPath;
//     a.download = 'document.pdf';
//     a.click();
//   };

//   const customStyles = {
//     dialogAlignment: { margin: "25px", textAlign: "center", width: "500px" },
//     pdfViewer: { overflowY: 'scroll', height: '81vh', border: '1px solid #00000014' },
//     pdfDiv: { boxShadow: '0 6px 8px #00000014, 0 4px 16px #0000001f', alignContent: "center", margin: "10px auto", display: "table" }
//   }

//   return (
   
//     <div className={isPDFFullWidth ? "homesectionPdf-2" : "viewFormSection-2"}>
//     {/* Change  05/04 Based on condtion icon will render */}
//     {isPDFFullWidth ?
//       <span className="k-icon k-font-icon k-i-fullscreen-exit k-i-full-screen-exit cursor pdfHideandShowIcons" onClick={() => setIsPDFFullWidth(!isPDFFullWidth)}></span> :
//       <span className="k-icon k-font-icon k-i-fullscreen k-i-full-screenk-i-fullscreen-enter cursor pdfHideandShowIcons" onClick={() => setIsPDFFullWidth(!isPDFFullWidth)}></span>}

    

//     <div className={styles.toolbar}>
//       <div id={styles.toolbarContainer}>
//         <div id={styles.toolbarViewer}>
//           {/* <div id={styles.toolbarViewerLeft}>
//             <button className={styles.toolbarButton}title="Previous Page" id="previous"  disabled={currentPage <= 1} onClick={handlePreviousPage}>
//               <span > <Icon iconName="ChevronLeft" /></span>
//             </button>
//             <button className={styles.toolbarButton} title="Next Page" id="next" disabled={currentPage >= numPages} onClick={handleNextPage}>
//               <span ><Icon iconName="ChevronRight" /></span>
//             </button>
//             <span className={styles.toolbarLabel}>{currentPage} / {numPages}</span>
//           </div> */}

//           <div id={styles.toolbarViewerMiddle}>
//             <div className="splitToolbarButton">
//               <button id="zoomOut" className={`${styles.toolbarButton} `} title="Zoom Out"  onClick={handleZoomOut}>
//                 <span> <Icon iconName="ZoomOut" /></span>
//               </button>
//               <button id="zoomIn" className={`${styles.toolbarButton} `} title="Zoom In" onClick={handleZoomIn}>
//                 <span><Icon iconName="ZoomIn" /></span>
//               </button>
//             </div>

//             <span id="scaleSelectContainer" className={`${styles.dropdownToolbarButton} `} >
//               <select id="scaleSelect" title="Zoom"  value={zoomLevel.toString()} onChange={handleZoomChange}>
//                 <option value="1.3">Actual Width</option>
//                 <option value="1.2">Fit to Width</option>
//                 <option value="1.1">Fit to Page</option>
//                 <option value="0.5">50%</option>
//                 <option value="0.75">75%</option>
//                 <option value="1">100%</option>
//                 <option value="1.25">125%</option>
//                 <option value="1.5">150%</option>
//                 <option value="2">200%</option>
//                 <option value="3">300%</option>
//                 <option value="4">400%</option>
//               </select>
//             </span>
//           </div>
//           <div id={styles.toolbarViewerRight}>

//             <div id="editorModeSeparator" className="verticalToolbarSeparator"></div>
//             <button onClick={handlePrint} id="print" className={`${styles.toolbarButton} `} title="Print"  data-l10n-id="pdfjs-print-button">
//               <Icon iconName="Print" />
//             </button>

//             <button id="download" className={`${styles.toolbarButton} `} title="Download"  data-l10n-id="pdfjs-save-button" onClick={handleSave}>
//             <Icon iconName="Download" />
//             </button>
//           </div>
         
//         </div>
//       </div>
//     </div>
//     {/* pdf viewer */}
//     <div className={styles.pdfviewer} ref={pdfViewerRef} >
//       {pages.map((page, index) => (
//         <div key={page?.pageNum} ref={(el) => (pageRefs.current[index] = el)} style={customStyles.pdfDiv}>
//           <img src={page?.canvas} alt={`Page ${page?.pageNum || index + 1}`} />
//         </div>
//       ))}
//     </div>
//   </div>
//   );
// };

// export default PDFViewer;




 // <div style={{ width: '100%' }}>
    //   {/* Toolbar */}
    //   <div
    //     classNameName={styles.toolbar}
    //     style={{
    //       display: 'flex',
    //       justifyContent: 'space-between',
    //       alignItems: 'center',
    //       width: '100%',
    //       position: 'sticky',
    //       top: 0,
    //       backgroundColor: '#fff',
    //       zIndex: 1000,
    //       padding: '10px 20px',
    //       boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    //     }}
    //   >
    //     <div
    //       id="toolbarContainer"
    //       style={{
    //         display: 'flex',
    //         width: '100%',
    //         justifyContent: 'space-between'
    //       }}
    //     >
    //       <div
    //         id="pageControls"
    //         style={{
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <button
    //           classNameName="toolbarButton"
    //           title="Previous Page"
    //           id="previous"
    //           disabled={currentPage <= 1}
    //           onClick={handlePreviousPage}
    //           style={{ width: 'auto' }}
    //         >
    //           <Icon iconName="ChevronLeft" />
    //         </button>
    //         <span classNameName="toolbarLabel">
    //           {currentPage} / {numPages}
    //         </span>
    //         <button
    //           classNameName="toolbarButton"
    //           title="Next Page"
    //           id="next"
    //           disabled={currentPage >= numPages}
    //           onClick={handleNextPage}
    //           style={{ width: 'auto' }}
    //         >
    //           <Icon iconName="ChevronRight" />
    //         </button>
    //       </div>
    //       <div
    //         id="zoomControls"
    //         style={{
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <button
    //           id="zoomOut"
    //           classNameName="toolbarButton"
    //           title="Zoom Out"
    //           onClick={handleZoomOut}
    //           style={{ width: 'auto' }}
    //         >
    //           <Icon iconName="ZoomOut" />
    //         </button>
    //         <button
    //           id="zoomIn"
    //           classNameName="toolbarButton"
    //           title="Zoom In"
    //           onClick={handleZoomIn}
    //           style={{ width: 'auto' }}
    //         >
    //           <Icon iconName="ZoomIn" />
    //         </button>
    //         <span
    //           id="scaleSelectContainer"
    //           classNameName="dropdownToolbarButton"
    //           style={{
    //             display: 'flex',
    //             alignItems: 'center'
    //           }}
    //         >
    //           <select
    //             id="scaleSelect"
    //             title="Zoom"
    //             value={fitToPage ? 'actualWidth' : zoomLevel.toString()}
    //             onChange={handleZoomChange}
    //           >
    //             <option value="actualWidth">Actual Width</option>
    //             <option value="fitWidth">Fit to Width</option>
    //             <option value="fitPage">Fit to Page</option>
    //             <option value="0.5">50%</option>
    //             <option value="0.75">75%</option>
    //             <option value="1">100%</option>
    //             <option value="1.25">125%</option>
    //             <option value="1.5">150%</option>
    //             <option value="2">200%</option>
    //             <option value="3">300%</option>
    //             <option value="4">400%</option>
    //           </select>
    //         </span>
    //       </div>
    //       <div
    //         id="actionControls"
    //         style={{
    //           display: 'flex',
    //           alignItems: 'center'
    //         }}
    //       >
    //         <button
    //           onClick={handlePrint}
    //           id="print"
    //           classNameName="toolbarButton"
    //           title="Print"
    //           style={{ width: 'auto' }}
    //         >
    //           <Icon iconName="Print" />
    //         </button>
    //         <button
    //           id="download"
    //           classNameName="toolbarButton"
    //           title="Download"
    //           onClick={handleSave}
    //           style={{ width: 'auto' }}
    //         >
    //           <Icon iconName="Download" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* PDF Viewer */}
    //   <div ref={pdfViewerRef} style={{ width: '100%' }}>
    //     {pages.map((page, index) => (
    //       <div key={page.pageNum} ref={(el) => (pageRefs.current[index] = el)}>
    //         <img src={page.canvas} alt={`Page ${page.pageNum || index + 1}`} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
