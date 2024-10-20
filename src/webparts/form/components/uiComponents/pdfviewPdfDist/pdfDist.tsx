/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IPDFViewerProps } from './IPDFViewerProps';
import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/web/pdf_viewer.css';
// import 'pdfjs-dist/build/pdf.worker.mjs';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// import styles from '../../Form.module.scss';
import styles from '../../Form.module.scss';
import { Icon } from '@fluentui/react';


pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFViewer: React.FC<IPDFViewerProps> = ({ pdfPath}) => {
  const pdfViewerRef = useRef<HTMLDivElement>(null);
  const [pdfDocument, setPdfDocument] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [fitToPage, setFitToPage] = React.useState(false);
  const [pages, setPages] = useState<{ pageNum: number; canvas: string }[]>([]);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchPdf = async (): Promise<void> => {
      const loadingTask = pdfjsLib.getDocument(pdfPath);
      const pdf = await loadingTask.promise;
      console.log(pdf)
      setPdfDocument(pdf);
    };
    fetchPdf().catch(console.error);
  }, [pdfPath]);



  

  useEffect(() => {
    const renderAllPages = async (pdf: pdfjsLib.PDFDocumentProxy, pageNumber: number): Promise<void> => {
      const renderedPages: { pageNum: number; canvas: string }[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: zoomLevel });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport: viewport }).promise;
          renderedPages.push({ pageNum: i, canvas: canvas.toDataURL() });
        }
      }
      setPages(renderedPages);
    };

    if (pdfDocument) {
      renderAllPages(pdfDocument, currentPage).catch(console.error);
      setNumPages(pdfDocument.numPages);
    }


    const throttle = (func: (...args: unknown[]) => void, limit: number): (() => void) => {
        let inThrottle: boolean;
        return function (this: unknown, ...args: unknown[]): void {
          if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
          }
        };
      };
    

    const handleScroll = throttle(() => {
      const pdfViewer = pdfViewerRef.current;
      if (!pdfViewer) return;
      const scrollTop = pdfViewer.scrollTop;
      const pageHeight = pdfViewer.scrollHeight / numPages;
      const newPage = Math.floor(scrollTop / pageHeight) + 1;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        if (pdfDocument) {
          renderAllPages(pdfDocument, newPage).catch(console.error);
        }
      }
    }, 200);

    const pdfViewer = pdfViewerRef.current;
    if (pdfViewer) {
      pdfViewer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (pdfViewer) {
        pdfViewer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pdfDocument, zoomLevel, currentPage, numPages]);

//   const handleNextPage = (): void => {
//     if (currentPage < numPages) {
//       setCurrentPage((prevPage: number) => {
//         const nextPage = prevPage + 1;
//         const nextPageRef = pageRefs.current[nextPage - 1];
//         if (nextPageRef && pdfViewerRef.current) {
//           pdfViewerRef.current.scrollTo({
//             top: nextPageRef.offsetTop,
//             behavior: 'smooth'
//           });
//         }
//         return nextPage;
//       });
//     }
//   };

//   const handlePreviousPage = (): void => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage: number) => {
//         const previousPage = prevPage - 1;
//         const previousPageRef = pageRefs.current[previousPage - 1];
//         if (previousPageRef && pdfViewerRef.current) {
//           pdfViewerRef.current.scrollTo({
//             top: previousPageRef.offsetTop,
//             behavior: 'smooth'
//           });
//         }
//         return previousPage;
//       });
//     }
//   };


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

const handleZoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = event.target.value;
  if (value === 'fitPage') {
    setFitToPage(true);
    setZoomLevel(4);
  } else {
    setFitToPage(false);
    setZoomLevel(Number(value));
  }
};

const handlePrint = () => {
  window.print();
};

const handleSave = () => {
  const a = document.createElement('a');
  a.href = pdfPath;
  a.download = 'document.pdf';
  a.click();
};


  return (
    <div style={{ width: '100%' }}>
    {/* Toolbar */}
    <div
      className={styles.toolbar}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 1000,
        padding: '10px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div
        id="toolbarContainer"
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div
          id="pageControls"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <button
            className="toolbarButton"
            title="Previous Page"
            id="previous"
            disabled={currentPage <= 1}
            onClick={handlePreviousPage}
            style={{ width: 'auto' }}
          >
            <Icon iconName="ChevronLeft" />
          </button>
          <span className="toolbarLabel">
            {currentPage} 
            {/* / {numPages} */}
          </span>
          <button
            className="toolbarButton"
            title="Next Page"
            id="next"
            disabled={currentPage >= numPages}
            onClick={handleNextPage}
            style={{ width: 'auto' }}
          >
            <Icon iconName="ChevronRight" />
          </button>
        </div>
        <div
          id="zoomControls"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <button
            id="zoomOut"
            className="toolbarButton"
            title="Zoom Out"
            onClick={handleZoomOut}
            style={{ width: 'auto' }}
          >
            <Icon iconName="ZoomOut" />
          </button>
          <button
            id="zoomIn"
            className="toolbarButton"
            title="Zoom In"
            onClick={handleZoomIn}
            style={{ width: 'auto' }}
          >
            <Icon iconName="ZoomIn" />
          </button>
          <span
            id="scaleSelectContainer"
            className="dropdownToolbarButton"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <select
              id="scaleSelect"
              title="Zoom"
              value={fitToPage ? 'actualWidth' : zoomLevel.toString()}
              onChange={handleZoomChange}
            >
              <option value="actualWidth">Actual Width</option>
              <option value="fitWidth">Fit to Width</option>
              <option value="fitPage">Fit to Page</option>
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
        <div
          id="actionControls"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <button
            onClick={handlePrint}
            id="print"
            className="toolbarButton"
            title="Print"
            style={{ width: 'auto' }}
          >
            <Icon iconName="Print" />
          </button>
          <button
            id="download"
            className="toolbarButton"
            title="Download"
            onClick={handleSave}
            style={{ width: 'auto' }}
          >
            <Icon iconName="Download" />
          </button>
        </div>
      </div>
    </div>

    {/* PDF Viewer */}
    <div ref={pdfViewerRef} style={{ width: '100%' }}>
      {pages.map((page, index) => (
        <div key={page.pageNum} ref={(el) => (pageRefs.current[index] = el)}>
          <img src={page.canvas} alt={`Page ${page.pageNum || index + 1}`} />
        </div>
      ))}
    </div>
  </div>
  );
};

export default PDFViewer;
