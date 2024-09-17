import * as React from 'react';

// @pnp/sp imports
// import { sp, Web } from '@pnp/sp';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IPnPPeoplePickerProps {
    
    context: WebPartContext;
  }

  interface IPnPPeoplePickerState {
    addUsers: string[];
  }

export default class PnPPeoplePicker2 extends React.Component<IPnPPeoplePickerProps, IPnPPeoplePickerState> {
  constructor(props: IPnPPeoplePickerProps, state: IPnPPeoplePickerState) {
    super(props);
    this.state = {
      addUsers: []
    };
  
  }

  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }

  public render(): React.ReactElement<IPnPPeoplePickerProps> {
    return (
        <PeoplePicker
        context={this.context}
        titleText="People Picker"
        personSelectionLimit={3}
        groupName={""} // Leave this blank in case you want to filter from all users
        showtooltip={true}
        // isRequired={true}
        disabled={false}
        ensureUser={true}
        onChange={this._getPeoplePickerItems}
        
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000} />
    );
  }

  

}