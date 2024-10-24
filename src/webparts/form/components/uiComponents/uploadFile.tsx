/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';
import { IconButton, Icon } from '@fluentui/react';
import styles from '../Form.module.scss';

export interface IUploadFileProps {
  typeOfDoc: string;
  onChange: (files: File[] | null, typeOfDoc: string) => void;
  accept?: string;
  maxFileSizeMB: number;
  multiple: boolean;
  maxTotalSizeMB?: number;
  data: File[];
  errorData: any;
}

interface IFileWithError {
  id: string;
  file: File;
  error: string | null;
}

interface IUploadFileState {
  selectedFiles: IFileWithError[];
  cummError: string | null;
  errorOfFile: any;
}

const getFileTypeIcon = (
  fileName: string
): { iconName: string; color: string } => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return { iconName: 'PDF', color: '#FF0000' }; // Red for PDF
    case 'doc':
    case 'docx':
      return { iconName: 'WordDocument', color: '#2B579A' }; // Blue for Word
    case 'xlsx':
    case 'xls':
      return { iconName: 'ExcelDocument', color: '#217346' }; // Green for Excel
    default:
      return { iconName: 'Page', color: '#605E5C' }; // Gray for other files
  }
};

export default class UploadFileComponent extends React.Component<IUploadFileProps, IUploadFileState> {
  private fileInputRef: React.RefObject<HTMLInputElement>;

  public constructor(props: IUploadFileProps) {
    super(props);
    this.state = {
      selectedFiles: [],
      cummError: null,
      errorOfFile: ''
    };
    this.fileInputRef = React.createRef<HTMLInputElement>();
  }

  public componentDidMount(): void {
    this.validateFiles(this.props.data);
  }

  public componentDidUpdate(prevProps: IUploadFileProps): void {
    if (prevProps.data !== this.props.data) {
      this.validateFiles(this.props.data);
    }
  }

  private isFileNameValid(name: string): boolean {
    const regex = /^[a-zA-Z0-9._ -]+$/;
    return regex.test(name);
  }

  private validateFiles(files: File[]): void {
    const { maxFileSizeMB, maxTotalSizeMB } = this.props;
    const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
    const maxTotalSizeBytes = maxTotalSizeMB
      ? maxTotalSizeMB * 1024 * 1024
      : undefined;
    let validFiles: IFileWithError[] = [];
    let currentTotalSize = 0;
    let cumulativeError = null;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let error: string | null = null;

      const allowedFileTypes = ['.pdf', '.doc', '.docx', '.xlsx'];
      if (!allowedFileTypes.includes(file.name.substring(file.name.lastIndexOf('.')))) {
        error = 'File type is not allowed';
      } else if (file.size > maxFileSizeBytes) {
        error = `File size should not exceed more ${maxFileSizeMB}MB`;
      } else if (!this.isFileNameValid(file.name)) {
        error = 'File name should not contain special characters';
      } else if (
        maxTotalSizeBytes &&
        currentTotalSize + file.size > maxTotalSizeBytes
      ) {
        cumulativeError =
          'Cumulative size of all the supporting documents should not exceed 25 MB.';
      }

      currentTotalSize += file.size;
      validFiles.push({ id: `${file.name}-${i}`, file, error });
      console.log(validFiles)
      const filterNullerrorInvalidFiles = validFiles.filter(
        (each:any)=>{
          return each.error !==null
        }
      )
      console.log(filterNullerrorInvalidFiles)
      this.props.errorData([filterNullerrorInvalidFiles, this.props.typeOfDoc]);
      this.setState({ errorOfFile: error });
    }

    this.setState({ selectedFiles: validFiles, cummError: cumulativeError });
  }

  private handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const updatedFiles = this.props.multiple
        ? [
            ...this.state.selectedFiles,
            ...files.map((file, index) => ({
              id: `${file.name}-${index}`,
              file,
              error: null
            }))
          ]
        : files.map((file, index) => ({
            id: `${file.name}-${index}`,
            file,
            error: null
          }));

      this.setState({ selectedFiles: updatedFiles }, () => {
        this.validateFiles(updatedFiles.map((f) => f.file));
      });

      this.props.onChange(
        updatedFiles.map((f) => f.file),
        this.props.typeOfDoc
      );

      if (this.fileInputRef.current) {
        this.fileInputRef.current.value = '';
      }
    }
  };

  private handleDeleteFile = (fileId: string): void => {
    const updatedFiles = this.state.selectedFiles.filter(
      (fileWithError) => fileWithError.id !== fileId
    );
    console.log(updatedFiles)
    this.props.errorData([updatedFiles, this.props.typeOfDoc]);

    this.setState({ selectedFiles: updatedFiles }, () => {
      this.validateFiles(updatedFiles.map((f) => f.file));
    });

    this.props.onChange(
      updatedFiles.map((f) => f.file),
      this.props.typeOfDoc
    );
  };

  public render(): React.ReactElement<IUploadFileProps> {
    const { accept, typeOfDoc, multiple } = this.props;
    const { selectedFiles, cummError } = this.state;

    return (
      <ul className={`${styles.fileAttachementsUl}`}>
        <li className={`${styles.basicLi} ${styles.inputField}`}>
          <div style={{ padding: '8px' }}>
            <div>
              <button
                type="button"
                onClick={() => {
                  if (this.fileInputRef.current) {
                    this.fileInputRef.current.click();
                  }
                }}
              >
                Upload File
              </button>

              <input
                type="file"
                ref={this.fileInputRef}
                onChange={this.handleFileChange}
                accept={accept}
                multiple={multiple}
                style={{ display: 'none' }}
              />
            </div>

            {typeOfDoc === 'supportingDocument' &&
              cummError &&
              cummError.trim() !== '' && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '10px',
                    paddingLeft: '4px',
                    margin: '0px',
                  }}
                >
                  {cummError}
                </span>
              )}
          </div>
        </li>

        {selectedFiles.length > 0 &&
          selectedFiles.map(({ id, file, error }) => {
            const { iconName, color } = getFileTypeIcon(file.name);
            return (
              <li
                key={id}
                style={{ display: 'flex', alignItems: 'center' }}
                className={`${styles.basicLi} ${styles.attachementli}`}
              >
                <div
                  style={{
                    padding: '2px',
                    marginBottom: '4px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignContent: 'center',
                    flexGrow: '1',
                  }}
                >
                  <Icon
                    iconName={iconName}
                    style={{
                      fontSize: '24px',
                      marginTop: '14px',
                      color: color,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        paddingBottom: '0px',
                        marginBottom: '0px',
                        paddingLeft: '4px',
                      }}
                    >
                      {file.name}
                    </p>
                    {error && (
                      <span
                        style={{
                          color: 'red',
                          fontSize: '10px',
                          paddingLeft: '4px',
                          margin: '0px',
                        }}
                      >
                        {error}
                      </span>
                    )}
                  </div>
                </div>

                <IconButton
                  iconProps={{ iconName: 'Cancel' }}
                  title="Delete File"
                  ariaLabel="Delete File"
                  onClick={() => this.handleDeleteFile(id)}
                />
              </li>
            );
          })}
      </ul>
    );
  }
}
