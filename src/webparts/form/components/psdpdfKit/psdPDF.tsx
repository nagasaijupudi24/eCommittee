/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @microsoft/spfx/import-requires-chunk-name */
import * as React from "react";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";

// import { useSnackbar } from "react-simple-snackbar";
// import styles from "./PSPDFKitViewer.module.scss";
// import { getSP } from "../../../pnpjsConfig";

export default function PSPDFKitViewer(props: IPSPDFKitViewerProps) {
  const containerRef = React.useRef(null);
  const [documentURL, setDocumentURL] = React.useState(props.documentURL);
//   const [openSnackbar] = useSnackbar();

  React.useEffect(() => {
    console.log("pspdf viewr")
    if (!documentURL) {
      return;
    }
    const container = containerRef.current;
    let instance: { exportPDF: () => any; }, PSPDFKit: { load?: any; defaultToolbarItems?: any; unload?: any; Action?: any; Annotation?: any; AnnotationsWillChangeReason?: any; Bookmark?: any; ButtonFormField?: any; CheckBoxFormField?: any; ChoiceFormField?: any; Color?: any; ComboBoxFormField?: any; Comment?: any; CommentMarkerAnnotation?: any; Conformance?: any; CustomOverlayItem?: any; DrawingPoint?: any; EllipseAnnotation?: any; Font?: any; FormField?: any; FormFieldValue?: any; FormOption?: any; GoToAction?: any; GoToEmbeddedAction?: any; GoToRemoteAction?: any; HideAction?: any; HighlightAnnotation?: any; ImageAnnotation?: any; InkAnnotation?: any; Inset?: any; Instance?: any; InstantClient?: any; Interfaces?: any; JavaScriptAction?: any; LaunchAction?: any; LineAnnotation?: any; LinkAnnotation?: any; List?: any; ListBoxFormField?: any; NamedAction?: any; NoteAnnotation?: any; OutlineElement?: any; PageInfo?: any; Point?: any; PolygonAnnotation?: any; PolylineAnnotation?: any; RadioButtonFormField?: any; Rect?: any; RectangleAnnotation?: any; RedactionAnnotation?: any; ResetFormAction?: any; SearchResult?: any; SearchState?: any; ShapeAnnotation?: any; SignatureFormField?: any; Size?: any; SquiggleAnnotation?: any; StampAnnotation?: any; StrikeOutAnnotation?: any; SubmitFormAction?: any; TextAnnotation?: any; TextFormField?: any; TextLine?: any; TextMarkupAnnotation?: any; TextSelection?: any; URIAction?: any; UnderlineAnnotation?: any; UnknownAnnotation?: any; ViewState?: any; WidgetAnnotation?: any; default?: any; }, restoreBlobDownloadInterception: () => void;

    const callFun = async () => {
      console.log("Will load PSPDFKit instance");
      
      

      PSPDFKit = await import("pspdfkit");

      const saveItem = {
        type: "custom",
        title: "Save",
        async onPress() {
        
          const fileContent = await instance.exportPDF();
         
          const file = props.sp.web.getFileByUrl(documentURL);

          await file.setContent(fileContent);
         
        },
      };
        
         instance = await PSPDFKit.load(
          
          {

        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: "https://xencia1.sharepoint.com/sites/XenciaDemoApps/uco/ECommitteeDocuments/AD1-2024-25-C147/Pdf/E0300SBIBZ.pdf",
        toolbarItems: [
          ...PSPDFKit.defaultToolbarItems,
          saveItem,
        ],
      });
      console.log("document rendered")

      restoreBlobDownloadInterception = disableBlobDownloadInterception();
    };
    callFun()

    return () => PSPDFKit && PSPDFKit.unload(container) && restoreBlobDownloadInterception();
  }, [documentURL]);

  React.useEffect(() => {
    setDocumentURL(props.documentURL);
  }, [props.documentURL]);

  return (
    <div className="App">
      {documentURL ? (
        <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      ) : (
        <div >
          <p>
            Select a PDF document from your libraries, and people can view and
            edit them with PSPDFKit without leaving your page.
          </p>
        </div>
      )}
    </div>
  );
}
export interface IPSPDFKitViewerProps {
  documentURL: string;
  sp:any;
}

function disableBlobDownloadInterception() {
  function disableBlobDownloadInterceptionInLink() {
    (event: MouseEvent) => {
      if (
        (event.target as Element).nodeName === "A" &&
        (event.target as HTMLElement).hasAttribute("download")
      ) {
        (event.target as HTMLAnchorElement).dataset.interception = "off";
      }
    }
  }
  document.addEventListener("click", disableBlobDownloadInterceptionInLink);

  return () => document.removeEventListener("click", disableBlobDownloadInterceptionInLink);
}
