/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// PnPPeoplePicker.tsx
import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DefaultButton } from "@fluentui/react";
import styles from "../../Form.module.scss";

export interface IPnPPeoplePickerProps {
  context: WebPartContext;
  spProp: any;
  getDetails:any;
  typeOFButton:any;

}

export interface IPnPPeoplePickerState {
  selectedPeople: any[];
  key: any;
  peoplePickerData: any[];
}

export default class PnPPeoplePicker extends React.Component<
  IPnPPeoplePickerProps,
  IPnPPeoplePickerState
> {
  constructor(props: IPnPPeoplePickerProps) {
    super(props);
    this.state = {
      selectedPeople: [],
      peoplePickerData: [],
      key: 0, // Add a key to force re-render
    };
  }

  

  private _clearPeoplePicker = () => {
    this.setState({ selectedPeople: [], key: this.state.key + 1 }); // Update the key to force re-render
  };

  private _getUserProperties = async (loginName: any): Promise<any> => {
    // console.log(loginName)
    let designation = "NA";
    let email = "NA";
    // const loginName = this.state.peoplePickerData[0]
    const profile = await this.props.spProp.profiles.getPropertiesFor(
      loginName
    );
    // console.log(profile)
    // console.log(profile.DisplayName);
    // console.log(profile.Email);
    // console.log(profile.Title);
    // console.log(profile.UserProfileProperties.length);
    designation = profile.Title;
    email = profile.Email;
    // Properties are stored in inconvenient Key/Value pairs,
    // so parse into an object called userProperties
    const props: any = {};
    profile.UserProfileProperties.forEach(
      (prop: { Key: string | number; Value: any }) => {
        props[prop.Key] = prop.Value;
      }
    );

    profile.userProperties = props;
    // console.log("Account Name: " + profile.userProperties.AccountName);
    return [designation, email];
  };

  private handleOnAdd = (event: any, type: string): void => {
    this.props.getDetails(this.state.selectedPeople,this.props.typeOFButton)
    this.setState((prev) => ({
      peoplePickerData: [
       
        ...this.state.selectedPeople,
      ],
    }));

  };

  private _getPeoplePickerItems = async (items: any[]) => {
    console.log("Items:", items);
    // fetchedData = items
    console.log(items[0].loginName);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    console.log(items, "this._getUserProperties(items[0].loginName)");

    // this.setState({approverInfo:items})

    const dataRec = await this._getUserProperties(items[0].loginName);
    // const finalData = await dataRec.json()
    // dataRec.then((x: any)=>{
    //   console.log(x)
    //   designation=x
    // });
    // console.log(typeof dataRec?.toString());

    if (typeof dataRec[0]?.toString() === "undefined") {
      const newItemsDataNA = items.map(
        (obj: { [x: string]: any; loginName: any }) => {
          console.log(obj);
          return {
            ...obj,
            optionalText: "N/A",
            
            email: obj.secondaryText,
          };
        }
      );
      console.log(newItemsDataNA);
      this.setState({ selectedPeople: newItemsDataNA });
    } else {
      const newItemsData = items.map((obj: { loginName: any }) => {
        return {
          ...obj,
          optionalText: dataRec[0],
          
          email: dataRec[1],
          srNo: dataRec[1].split("@")[0],
        };
      });
      // console.log(newItemsData)
      this.setState({ selectedPeople: newItemsData });
    }
  };

  public render(): React.ReactElement<IPnPPeoplePickerProps> {
    console.log(this.state);
    console.log(this.props)
    const peoplePickerContext = {
      absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
      msGraphClientFactory: this.props.context.msGraphClientFactory,
      spHttpClient: this.props.context.spHttpClient,
    };

    

    return (
      <div style={{ display: "flex" }}>
        <PeoplePicker
          key={this.state.key}
          context={peoplePickerContext}
        
          personSelectionLimit={1}
          groupName={""}
          showtooltip={true}
          disabled={false}
          ensureUser={true}
          onChange={this._getPeoplePickerItems.bind(this)}
          principalTypes={[PrincipalType.User]}
          resolveDelay={1000}
        />
        <DefaultButton
          type="button"
          className={`${styles.commonBtn2} ${styles.addBtn}`}
          onClick={(e) => {
            this.handleOnAdd(e, "reveiwer");
            this._clearPeoplePicker();
          }}
          iconProps={{ iconName: "Add" }}
        >
          Add
        </DefaultButton>
        {/* <button onClick={this._clearPeoplePicker}>Clear People Picker</button> */}
      </div>
    );
  }
}
