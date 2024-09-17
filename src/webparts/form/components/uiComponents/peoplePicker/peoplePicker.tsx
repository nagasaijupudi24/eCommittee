// PnPPeoplePicker.tsx
import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

export interface IPnPPeoplePickerProps {
  context: WebPartContext;
}

export interface IPnPPeoplePickerState {
  addUsers: any[];
}

export default class PnPPeoplePicker extends React.Component<IPnPPeoplePickerProps, IPnPPeoplePickerState> {
  constructor(props: IPnPPeoplePickerProps) {
    super(props);
    this.state = {
      addUsers: []
    };
  }

  private _getPeoplePickerItems(items: any[]) {
    console.log('Selected Items:', items);
  }

  public render(): React.ReactElement<IPnPPeoplePickerProps> {
    const peoplePickerContext = {
      absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
      msGraphClientFactory: this.props.context.msGraphClientFactory,
      spHttpClient: this.props.context.spHttpClient
    };

    return (
      <PeoplePicker
        context={peoplePickerContext}
        titleText="People Picker"
        personSelectionLimit={1}
        groupName={""}
        showtooltip={true}
        disabled={false}
        ensureUser={true}
        onChange={this._getPeoplePickerItems.bind(this)}
        principalTypes={[PrincipalType.User]}
        resolveDelay={1000}
      />
    );
  }
}
