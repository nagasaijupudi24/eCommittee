import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IPDFViewerProps } from './IPDFViewerProps';
import * as pdfjsLib from 'pdfjs-dist';
// import 'pdfjs-dist/web/pdf_viewer.css';
// import 'pdfjs-dist/build/pdf.worker.mjs';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// import styles from '../../Form.module.scss';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFViewer: React.FC<IPDFViewerProps> = ({ pdfPath, zoomLevel = 0.6}) => {
  const pdfViewerRef = useRef<HTMLDivElement>(null);
  const [pdfDocument, setPdfDocument] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
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


  return (
    <div>
      <div  ref={pdfViewerRef}>
        {pages.map((page, index) => (
          <div key={page.pageNum} ref={(el) => (pageRefs.current[index] = el)}>
            <img src={page.canvas} alt={`Page ${page.pageNum || index + 1}`} />
          </div>
        ))}
      </div>
      {/* <div className="pdf-navigation">
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div> */}
    </div>
  );
};

export default PDFViewer;
