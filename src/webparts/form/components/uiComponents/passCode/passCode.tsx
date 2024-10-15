import * as React from 'react';
import { TextField, PrimaryButton, DefaultButton, MessageBar, MessageBarType, Modal, IconButton } from '@fluentui/react';
import styles from './PasscodeModal.module.scss'; // Custom styles
import CryptoJS from 'crypto-js'; // Import crypto-js

export interface IPasscodeModalProps {
  sp: any;
  user: any;
  isOpen: boolean; // Control modal visibility
  onClose: () => void; // Callback to close the modal
  onSuccess: () => void; // Callback when passcode is validated successfully
}

export interface IPasscodeModalState {
  userId: any;
  passcode: string;
  newPasscode: string; // State for creating a new passcode
  errorMessage: string;
  storedPasscodes: { [email: string]: string }; // Store encrypted passcodes with emails
  userEmail: string; // Store the current user's email
  isCreating: boolean; // Control the state for creating a new passcode
}

export default class PasscodeModal extends React.Component<IPasscodeModalProps, IPasscodeModalState> {
  private encryptionKey: string = 'default_secret_key'; // Use a secure key in production

  constructor(props: IPasscodeModalProps) {
    super(props);

    this.state = {
      passcode: '',
      newPasscode: '',
      errorMessage: '',
      storedPasscodes: {}, // Initialize an empty object for stored passcodes
      userEmail: this.props.user.email, // Initialize user email state
      userId: '',
      isCreating: false // Initialize creation state
    };
  }

  private getUserIdByEmail = async (email: string): Promise<number> => {
    try {
      const user = await this.props.sp.web.siteUsers.getByEmail(email)();
      return user.Id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  public async componentDidMount() {
    await this.fetchStoredPasscodes();
    const userId = await this.getUserIdByEmail(this.props.user.email);
    this.setState({ userId });
  }

  private fetchStoredPasscodes = async () => {
    try {
      const items: any[] = await this.props.sp.web.lists
        .getByTitle("passcodes")
        .items
        .select("User/EMail", "User/Title", "passcode")
        .expand("User")();


        console.log(items)

      const storedPasscodes: { [email: string]: string } = {};
      items.forEach(item => {
        storedPasscodes[item.User.EMail] = item.passcode;
      });

      this.setState({ storedPasscodes }, this.checkUserPasscode);
    } catch (error) {
      console.error("Error fetching passcodes:", error);
      this.setState({ errorMessage: 'Failed to fetch passcodes.' });
    }
  };

  private checkUserPasscode = () => {
    const { userEmail, storedPasscodes } = this.state;

    if (!storedPasscodes[userEmail]) {
      this.setState({ isCreating: true }); // Show option to create a new passcode
    }
  };

  private onPasscodeChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ passcode: newValue || '', errorMessage: '' });
  };

  private onNewPasscodeChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ newPasscode: newValue || '', errorMessage: '' });
  };

  private encrypt = (text: string): string => {
    const encrypted = CryptoJS.AES.encrypt(text, this.encryptionKey).toString();
    return encrypted;
  };

  private decrypt = (encryptedText: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.encryptionKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decrypted)
    return decrypted;
  };



  private saveNewPasscode = async () => {
    const { newPasscode } = this.state;

    if (!newPasscode) {
      this.setState({ errorMessage: 'Please enter a passcode.' });
      return;
    }

    const encryptedPasscode = this.encrypt(newPasscode);

    try {
      await this.props.sp.web.lists.getByTitle("passcodes").items.add({
        UserId: this.state.userId,
        passcode: encryptedPasscode,
        Title: this.props.user.displayName
      });

      this.setState({ isCreating: false, newPasscode: '', errorMessage: '' });
      this.props.onSuccess(); // Call the success callback on saving
      this.props.onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving new passcode:", error);
      this.setState({ errorMessage: 'Failed to save new passcode.' });
    }
  };

  private validatePasscode = () => {
    const { passcode, storedPasscodes, userEmail } = this.state;

    const encryptedPasscode = storedPasscodes[userEmail];

    if (!encryptedPasscode) {
      this.setState({ errorMessage: 'No passcode found for this user.' });
      return;
    }

    try {
      const decryptedPasscode = this.decrypt(encryptedPasscode);
      console.log(decryptedPasscode)

      if (decryptedPasscode === passcode) {
        this.props.onSuccess(); // Call the success callback on validation
        this.props.onClose(); // Close the modal
      } else {
        this.setState({ errorMessage: 'Invalid passcode. Please try again.' });
      }
    } catch (error) {
      console.error("Error decrypting passcode:", error);
      this.setState({ errorMessage: 'Failed to validate passcode.' });
    }
  };

  public render(): React.ReactElement<IPasscodeModalProps> {
    const { isOpen, onClose } = this.props;
    const { passcode, errorMessage, isCreating, newPasscode } = this.state;
    console.log(this.state)

    return (
      <Modal
        isOpen={isOpen}
        onDismiss={onClose}
        isBlocking={false}
        containerClassName={styles.passcodeModalContainer}
      >
        <div className={styles.header}>
          <span>Enter Passcode</span>
          <IconButton
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close"
            onClick={onClose}
            className={styles.closeButton}
          />
        </div>
        <div className={styles.body}>
          {isCreating ? (
            <>
              <TextField
                label="Create New Passcode"
                value={newPasscode}
                onChange={this.onNewPasscodeChange}
                type="password"
              />
              <MessageBar messageBarType={MessageBarType.info}>
                You do not have a passcode. Please create one.
              </MessageBar>
              <div className={styles.buttons}>
                <PrimaryButton text="Save" onClick={this.saveNewPasscode} />
                <DefaultButton text="Cancel" onClick={onClose} />
              </div>
            </>
          ) : (
            <>
              <TextField
                label="Passcode"
                value={passcode}
                onChange={this.onPasscodeChange}
                type="password"
              />
              {errorMessage && (
                <MessageBar messageBarType={MessageBarType.error}>
                  {errorMessage}
                </MessageBar>
              )}
              <div className={styles.buttons}>
                <PrimaryButton text="Submit" onClick={this.validatePasscode} />
                <DefaultButton text="Cancel" onClick={onClose} />
              </div>
            </>
          )}
        </div>
      </Modal>
    );
  }
}
