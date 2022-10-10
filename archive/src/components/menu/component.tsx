import {Authorization} from "..";

import {Navigator} from ".";
import {External} from ".";
import {Content} from ".";
import {Divider} from ".";
import {Vertex} from ".";
import {Global} from ".";
import {Panel} from ".";
import {Item} from ".";
import {List} from ".";

import "./index.scss";

import React from "react";

/***
 * Consider Adding breakpoint (@media (min-width: 1320px)) for Menu Panels
 */
export const Menu = () => {
    const authorization = Authorization.useAuthorization();

    // return (!(authorization) || authorization?.user === null) ? (
    return (
        <Navigator>
            <Global prefix={process.env["REACT_APP_NAME"]} title={process.env["REACT_APP_SUFFIX"]} reload={false}/>
            <Panel title={"References"}>
                <Content>
                    <Vertex content={"Components"}>
                        <List name={"Components"} items={[
                            {title: "Tiles"},
                            {title: "Menu"},
                            {title: "Spinner"},
                            {title: "User-Input"},
                            {title: "Authorization"}
                        ]}/>
                    </Vertex>
                    <Vertex content={"Column-2"}/>
                    <Vertex content={"Column-3"}/>
                    <Divider content={"External Reference(s)"}>
                        <External>
                            <List name={"Changelogs"} items={[
                                {title: "Terraform", icon: "terraform", link: process.env["REACT_APP_TERRAFORM_LINK"]},
                                {title: "Lambda", icon: "lambda", link: process.env["REACT_APP_LAMBDA_LINK"]},
                                {title: "Consul", icon: "consul", link: process.env["REACT_APP_CONSUL_LINK"]},
                                {title: "Vagrant", icon: "vagrant", link: process.env["REACT_APP_VAGRANT_LINK"]}
                            ]}/>
                            <List name={null} items={[
                                {title: "Jira", icon: "jira", link: process.env["REACT_APP_JIRA_LINK"]},
                                {title: "GitHub", icon: "github", link: process.env["REACT_APP_GITHUB_LINK"]},
                                {title: "GitLab", icon: "gitlab", link: process.env["REACT_APP_GITLAB_LINK"]}
                            ]}/>
                        </External>
                    </Divider>
                </Content>
            </Panel>
        </Navigator>
    );
};

export default Menu;

