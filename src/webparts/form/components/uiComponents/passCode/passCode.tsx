/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import "@pnp/sp/files";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files/web";

import {
  TextField,
  PrimaryButton,
  DefaultButton,
  MessageBar,
  MessageBarType,
  Modal,
  IconButton,
} from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import CryptoJS from "crypto-js";

export interface IPasscodeModalProps {
  sp: any;
  user: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  createPasscodeUrl: string; // Added property for redirect URL
}

export interface IPasscodeModalState {
  userId: any;
  passcode: string;
  errorMessage: string;
  userPasscodes: Array<{ username: string; passcode: string }>;
  userEmail: string;
  isCreating: boolean;
  isPasswordVisible: boolean;
}

export default class PasscodeModal extends React.Component<
  IPasscodeModalProps,
  IPasscodeModalState
> {
  // private encryptionKey: string = 'default_secret_key'; // Use a secure key in production
  private key = CryptoJS.enc.Utf8.parse('b75524255a7f54d2726a951bb39204df');
  private iv = CryptoJS.enc.Utf8.parse('1583288699248111');
  constructor(props: IPasscodeModalProps) {
    super(props);

    this.state = {
      passcode: "",
      errorMessage: "",
      userPasscodes: [],
      userEmail: this.props.user.email,
      userId: "",
      isCreating: false,
      isPasswordVisible: false,
    };
  }

  public async componentDidMount() {
    console.log("Component did mount");
    await this.fetchStoredPasscodes();
    const userId = await this.getUserIdByEmail(this.props.user.email);
    this.setState({ userId });
    console.log("User ID:", userId);
  }

  private getUserIdByEmail = async (email: string): Promise<number> => {
    try {
      const user = await this.props.sp.web.siteUsers.getByEmail(email)();
      console.log("Fetched user:", user);
      return user.Id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  private fetchStoredPasscodes = async () => {
    const user = await this.props.sp?.web.currentUser();
    console.log("Current user:", user);

    try {
      const items: any[] = await this.props.sp.web.lists
        .getByTitle("passcodes")
        .items.filter(`UserId eq ${user.Id}`)
        .select("User/EMail", "User/Title", "passcode")
        .expand("User")();

      const userPasscodes = items.map((item) => {
        const decryptedPasscode = this.decrypt(item.passcode);
        return {
          username: item.User.Title,
          passcode: decryptedPasscode,
        };
      });

      this.setState({ userPasscodes }, this.checkUserPasscode);
      console.log("Fetched passcodes:", userPasscodes);
    } catch (error) {
      console.error("Error fetching passcodes:", error);
      this.setState({ errorMessage: "Failed to fetch passcodes." });
    }
  };

  private checkUserPasscode = () => {
    const { userPasscodes } = this.state;
    const userPasscode = userPasscodes.find(
      (up) => up.username === this.props.user.displayName
    );

    if (!userPasscode) {
      this.setState({ isCreating: true });
    }
    console.log("User passcode check:", userPasscode);
  };

  private onPasscodeChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    this.setState({ passcode: newValue || "", errorMessage: "" });
    console.log("Passcode changed:", newValue);
  };

  private togglePasswordVisibility = () => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
    console.log("Password visibility toggled:", this.state.isPasswordVisible);
  };

  private decrypt = (encryptedText: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.key, {
      iv: this.iv,
    });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  };

  private validatePasscode = () => {
    const { passcode, userPasscodes } = this.state;
    const userPasscode = userPasscodes.find(
      (up) => up.username === this.props.user.displayName
    );

    if (!userPasscode) {
      this.setState({ errorMessage: "No passcode found for this user." });
      console.log("No passcode found for user");
      return;
    }

    if (userPasscode.passcode === passcode) {
      this.props.onSuccess();
      this.props.onClose();
      console.log("Passcode validated successfully");
    } else {
      this.setState({ errorMessage: "Invalid passcode. Please try again." });
      console.log("Invalid passcode");
    }
  };

  private redirectToCreatePasscode = () => {
    console.log("Redirecting to create passcode URL:", this.props.createPasscodeUrl);
    window.location.href = this.props.createPasscodeUrl;
  };

  public render(): React.ReactElement<IPasscodeModalProps> {
    const { isOpen, onClose } = this.props;
    const {
      passcode,
      errorMessage,
      isCreating,
      isPasswordVisible,
    } = this.state;

    const styles = mergeStyleSets({
      modal: {
        padding: "10px",
        minWidth: "300px",
        maxWidth: "80vw",
        width: "100%",
        "@media (min-width: 768px)": {
          maxWidth: "580px",
        },
        "@media (max-width: 767px)": {
          maxWidth: "290px",
        },
        margin: "auto",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      },
      body: {
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
      },
      footer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        borderTop: "1px solid #ddd", // Similar footer style as in ConfirmationDialog
        paddingTop: "10px",
      },
      button: {
        flex: "1 1 50%", // Ensures each button takes up 50% of the footer width
        margin: "0 5px", // Adds some space between the buttons
      },
      iconButton: {
        marginRight: "10px",
      },
    });

    return (
      <Modal
        isOpen={isOpen}
        onDismiss={onClose}
        isBlocking={true}
        containerClassName={styles.modal}
      >
        <div className={styles.header}>
          <h2>Passcode Authentication</h2>
          <IconButton iconProps={{ iconName: "Cancel" }} onClick={onClose} />
        </div>
        <div className={styles.body}>
          {isCreating ? (
            <>
              <MessageBar messageBarType={MessageBarType.info}>
                Passcode is not set. Please create a passcode to proceed further.
              </MessageBar>
              <div className={styles.footer}>
                <PrimaryButton
                  className={styles.button}
                  text="Create Passcode"
                  onClick={this.redirectToCreatePasscode}
                />
                <DefaultButton
                  className={styles.button}
                  text="Cancel"
                  onClick={onClose}
                />
              </div>
            </>
          ) : (
            <>
              <TextField
                label="Enter Passcode"
                value={passcode}
                onChange={this.onPasscodeChange}
                type={isPasswordVisible ? "text" : "password"}
                onRenderSuffix={() => (
                  <IconButton
                    iconProps={{
                      iconName: isPasswordVisible ? "Hide" : "RedEye",
                    }}
                    onClick={this.togglePasswordVisibility}
                  />
                )}
              />{" "}
              {errorMessage && (
                <MessageBar messageBarType={MessageBarType.error}>
                  {errorMessage}
                </MessageBar>
              )}
              <div className={styles.footer}>
                <PrimaryButton
                  className={styles.button}
                  text="Submit"
                  onClick={this.validatePasscode}
                />
                <DefaultButton
                  className={styles.button}
                  text="Cancel"
                  onClick={onClose}
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    )
  }
}