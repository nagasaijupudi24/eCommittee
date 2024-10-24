/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal, PrimaryButton, IconButton, Icon, IIconProps, DefaultButton } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const GistDocsConfirmation: React.FC<{ isVisibleAlter: boolean; onCloseAlter: () => void; statusOfReq: any, handleConfirmatBtn:any}> = ({ isVisibleAlter, onCloseAlter, statusOfReq, handleConfirmatBtn }) => {
    const closeIcon: IIconProps = { iconName: "Cancel" };

    const styles = mergeStyleSets({
        modal: {
            padding: '10px',
            minWidth: '300px',
            maxWidth: '80vw',
            width: '100%',
            '@media (min-width: 768px)': {
                maxWidth: '580px', // Adjust width for medium screens
            },
            '@media (max-width: 767px)': {
                maxWidth: '290px', // Adjust width for smaller screens
            },
            margin: 'auto',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px 0',
        },
        footer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
            borderTop: '1px solid #ddd', // Added border to the top of the footer
            paddingTop: '10px',
        },
    });

    return (
        <Modal
            isOpen={isVisibleAlter}
            onDismiss={onCloseAlter}
            isBlocking={true}
            containerClassName={styles.modal}
        >
            <div style={{ borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon iconName="CheckMark" style={{ marginRight: '10px' }} />
                    <h2>Confirmation</h2>
                </div>
                <IconButton iconProps={closeIcon} onClick={onCloseAlter} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <p>Are you sure you want to submit this request?</p>
                <p style={{ textAlign: 'center' }}>Please click on Confirm button to submit request.</p>
            </div>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '10px', display: 'flex', justifyContent: 'end', gap: '10px' }}>
                <PrimaryButton  iconProps={{ iconName: "SkypeCircleCheck" }} onClick={handleConfirmatBtn} text="Confirm"  />
                <DefaultButton iconProps={{ iconName: "ErrorBadge" }} onClick={onCloseAlter} text="Cancel"  />
            </div>
        </Modal>
    );
};

export default GistDocsConfirmation;
