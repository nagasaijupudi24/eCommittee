// // PDFViewerComponent.tsx

// import * as React from 'react';
// import * as pdfjsLib from 'pdfjs-dist';
// // import 'pdfjs-dist/web/pdf_viewer.css';
// import { Spinner } from '@fluentui/react/lib/Spinner';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// import { useBoolean } from '@fluentui/react-hooks';
// import { DefaultButton, IconButton } from '@fluentui/react';

// // import "../styles/pdf_viewer.css"; // Custom styles for PDF viewer
// import { useEffect, useRef, useState } from 'react';

// // Setting the worker source for PDF.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// // Define the props interface
// interface PDFViewerComponentProps {
//     sp:any;
//   path: string; // Path to the PDF file passed from the parent component
// }

// const PDFViewerComponent: React.FC<PDFViewerComponentProps> = (props:any) => {
//     console.log(props)
//   const [pdfDocument, setPdfDocument] = useState<any>(null);
//   const [pages, setPages] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [numPages, setNumPages] = useState<number>(0);
//   const [zoomLevel, setZoomLevel] = useState<number>(1);
//   const [isPDFFullWidth] = useBoolean(false);

//   const pdfViewerRef = useRef<HTMLDivElement>(null);
//   const pageRefs = useRef<Array<HTMLDivElement | null>>([]);

//   // Throttle function for scroll
//   const throttle = (func: Function, limit: number) => {
//     let inThrottle: boolean;
//     return function () {
//       const args = arguments;
//       const context = this;
//       if (!inThrottle) {
//         func.apply(context, args);
//         inThrottle = true;
//         setTimeout(() => (inThrottle = false), limit);
//       }
//     };
//   };

//   useEffect(() => {
//     // Fetch PDF base64 and render on load when path changes
//     if (props.path) {
//       getPDFbase64(props.path);
//     }

//     const handleScroll = throttle(() => {
//       const pdfViewer = pdfViewerRef.current;
//       if (!pdfViewer) return;

//       const scrollTop = pdfViewer.scrollTop;
//       const pageHeight = pdfViewer.scrollHeight / numPages;
//       const newPage = Math.floor(scrollTop / pageHeight) + 1;

//       if (newPage !== currentPage) {
//         setCurrentPage(newPage);
//         renderAllPages(pdfDocument, newPage); // Update visible pages
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
//   }, [props.path, pdfDocument, zoomLevel, currentPage, pages, numPages]);


//   const fetchBase64PDF = async (filePath: string): Promise<string> => {
//     try {
//         const {sp} = props
//         console.log(sp)
//       // Fetch the file as an ArrayBuffer
//       const file: ArrayBuffer = await sp.web.getFileByServerRelativePath(filePath).getBuffer();
//       console.log(file)
//       // Convert ArrayBuffer to base64 string
//       const base64String = arrayBufferToBase64(file);
//       return base64String;
//     } catch (error) {
//       console.error('Error fetching PDF file:', error);
//       throw new Error('Failed to fetch the PDF file');
//     }
//   };
  
//   /**
//    * Converts an ArrayBuffer to a base64 string.
//    * @param buffer - The ArrayBuffer to convert.
//    * @returns The base64 string representation of the ArrayBuffer.
//    */
//   const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   // Fetch PDF base64 and render it
//   const getPDFbase64 = async (pdfPath: string) => {
//     const pdfDetails = await fetchBase64PDF(pdfPath); // API call to fetch the PDF in base64 format
//     renderPDF(pdfDetails);
//   };

//   // Rendering PDF from base64 data
//   const renderPDF = (pdfDetails: string) => {
//     const binaryString = window.atob(pdfDetails);
//     const bytes = new Uint8Array(binaryString.length);
//     for (let i = 0; i < binaryString.length; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }
//     const loadingTask = pdfjsLib.getDocument({ data: bytes });
//     loadingTask.promise.then((pdf) => {
//       setPdfDocument(pdf);
//       setNumPages(pdf.numPages);
//       renderInitialPages(pdf);
//     });
//   };

//   // Rendering initial pages
//   const renderInitialPages = (pdf: any) => {
//     renderPages(pdf, 1, 2);
//   };

//   // Rendering specific pages
//   const renderPages = (pdf: any, startPage: number, endPage: number) => {
//     const pagePromises = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pagePromises.push(pdf.getPage(i));
//     }
//     Promise.all(pagePromises).then((pages) => {
//       const renderPromises = pages.map((page) => {
//         const scale = zoomLevel;
//         const viewport = page.getViewport({ scale });
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         const renderContext = { canvasContext: context, viewport };
//         return page.render(renderContext).promise.then(() => ({
//           pageNum: page.pageNumber,
//           canvas: canvas.toDataURL(),
//         }));
//       });
//       Promise.all(renderPromises).then((renderedPages) => {
//         setPages(renderedPages);
//       });
//     });
//   };

//   // Rendering full pages
//   const renderAllPages = (pdf: any, currentPage: number) => {
//     const buffer = 2;
//     const startPage = Math.max(currentPage - buffer, 1);
//     const endPage = Math.min(currentPage + buffer, numPages);
//     renderPages(pdf, startPage, endPage);
//   };

//   // Event handlers for navigation
//   const handleNextPage = () => {
//     if (currentPage < numPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // Event handler for zoom
//   const handleZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setZoomLevel(parseFloat(e.target.value));
//   };

//   return (
//     <div className={isPDFFullWidth ? "homesectionPdf-2" : "viewFormSection-2"}>
//       <div className="toolbar">
//         <div id="toolbarContainer">
//           <div id="toolbarViewerLeft">
//             <DefaultButton onClick={handlePreviousPage} text="Previous" disabled={currentPage <= 1} />
//             <DefaultButton onClick={handleNextPage} text="Next" disabled={currentPage >= numPages} />
//             <span>{currentPage} / {numPages}</span>
//           </div>
//           <div id="toolbarViewerRight">
//             <IconButton iconProps={{ iconName: 'Print' }} title="Print" ariaLabel="Print" onClick={() => window.print()} />
//             <IconButton iconProps={{ iconName: 'Download' }} title="Download" ariaLabel="Download" onClick={() => { /* Download logic */ }} />
//           </div>
//           <div id="toolbarViewerMiddle">
//             <select value={zoomLevel.toString()} onChange={handleZoomChange}>
//               <option value="0.75">75%</option>
//               <option value="1">100%</option>
//               <option value="1.25">125%</option>
//               <option value="1.5">150%</option>
//               <option value="2">200%</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* PDF Viewer */}
//       <div className="pdf-viewer" ref={pdfViewerRef}>
//         {pages.length === 0 ? (
//           <Spinner label="Loading PDF..." />
//         ) : (
//           pages.map((page, index) => (
//             <div key={index} ref={(el) => (pageRefs.current[index] = el)}>
//               <img src={page?.canvas} alt={`Page ${index + 1}`} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFViewerComponent;

