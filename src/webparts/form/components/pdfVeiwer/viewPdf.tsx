/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-floating-promises */
// ViewPdf.tsx
import * as React from 'react';
// import styles from './PdfViewer.module.scss';
// import styles from '../Form.module.scss';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.mjs';
import "pdfjs-dist/web/pdf_viewer.css";
 
export interface IViewPdfProps {
  pdfUrl: string;
}
 
const ViewPdf: React.FC<IViewPdfProps> = ({ pdfUrl }) => {
    console.log(pdfUrl)
  const containerRef = React.useRef<HTMLDivElement>(null);
 
  React.useEffect(() => {
    if (pdfUrl) {
      const loadPdf = async () => {
        const container = containerRef.current;
        if (!container) return;
 
        // Clear previous rendered canvases
        container.innerHTML = '';
 
        // Load the PDF document
        const pdfDocument = await pdfjsLib.getDocument(pdfUrl).promise;
 
        // Loop through all pages and render them
        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
          const page = await pdfDocument.getPage(pageNum);
 
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
 
          const context = canvas.getContext('2d');
          if (context) {
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            await page.render(renderContext).promise;
 
            // Append canvas to the container
            container.appendChild(canvas);
          }
        }
      };
 
      loadPdf();
    }
  }, [pdfUrl]);
 
  return (
    <div
    //  className={styles.pdfContainer}  
     ref={containerRef}></div>
  );
};
 
export default ViewPdf;