/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MyDialog.tsx
import * as React from "react";
import {
  Dialog,
  DialogFooter,
  DialogType,
  PrimaryButton,
  Stack,
  
  // IStackItemStyles, 
  IStackStyles,
  Icon 
} from "@fluentui/react";

interface MyDialogProps {
  hidden: boolean;
  handleDialogBox: () => void;
  data: any;
  // undefindedData:any;
}



const MyDialog: React.FC<MyDialogProps> = ({
  hidden,
  data,
  handleDialogBox,
}) => {
  // console.log(data);
  // const [undefinedData, setUndefinedData] = React.useState<string[]>([]);

  const stackStyles: IStackStyles = {
    root: {
      display: 'flex',
      flexDirection: 'row', // or 'column' for vertical stacking
      // background: '#f3f2f1',
      padding: 10,
      borderBottom: '1px solid #ddd',
      justifyContent: 'space-between', // Adjust as needed
      alignItems: 'center', // Adjust as needed
    },
  };

  const buttonStyles: IStackStyles = {
    root:{
      // background:'red'
    }
  }

  const undefinedData = Object.keys(data).map((each: string) => {
    console.log(each)
    console.log(data[each])

    if (data[each][0] === "") {
      console.log(data[each][1])
      return data[each][1];
    }else if (data[each][0].length === 0){
      console.log(data[each][1])
      return data[each][1]
    }
  }).filter((each:any)=>each);
  // console.log(emptyArray)
  console.log(undefinedData);

  return (
    <Dialog
    hidden={hidden}
    //   onDismiss={onClose}
    dialogContentProps={{
      type: DialogType.largeHeader,
      // title: "Sample Dialog",
      // subText: "This is a sample dialog using Fluent UI.",
    }}
    modalProps={{
      isBlocking: true,
    }}
  >
     <Stack>
      <Stack styles={stackStyles}>
        <p>Alert!</p>
  
        <Icon iconName="Cancel" onClick={handleDialogBox}/>
        
      </Stack>
     
    </Stack>
    <h4>Please fill up all the mandatory fields</h4>
    <ul>
      {undefinedData.map((each) =>{
        console.log(each)
        if (each!== "" || each!== undefined) {
          console.log(each)

          return (
        
            <li key={each}>{each}</li>
          )

        }
        
      } )}
    </ul>
    <p><strong>Note: </strong>Invalid files are not allowed</p>
    
    <DialogFooter>
      <PrimaryButton text="OK" iconProps={{ iconName: 'ReplyMirrored' }} onClick={handleDialogBox} styles={buttonStyles}/>
      {/* <DefaultButton  text="Cancel" /> */}
    </DialogFooter>
  </Dialog>
   
  );
};

export default MyDialog;
