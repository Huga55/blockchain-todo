import React from "react";
import { Tabs as AntTabs, Dropdown, Flex } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { ITab } from "../../interfaces/tabs";

interface TabsProps {
  tabs: ITab[];
  currentTab: string;
  onAddTab(): void;
  onEditTab: (id: string) => void;
  onDeleteTab: (id: string) => void;
  onChangeTab: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  currentTab,
  onAddTab,
  onEditTab,
  onDeleteTab,
  onChangeTab,
}) => {
  const handleChangeTabs = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      onAddTab();
    } else {
    }
  };

  const getDropDownOptions = (tabId: string) => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => onEditTab(tabId),
    },
    ...(tabs.length > 1
      ? [
          {
            key: "remove",
            label: "Remove",
            onClick: () => onDeleteTab(tabId),
          },
        ]
      : []),
  ];

  const renderRemoveIcon = (tabId: string) => (
    <Dropdown menu={{ items: getDropDownOptions(tabId) }}>
      <span>
        <UnorderedListOutlined />
      </span>
    </Dropdown>
  );

  const items = tabs.map((tab) => ({
    key: tab.id,
    closable: false,
    label: (
      <Flex gap={10}>
        {tab.name}
        {renderRemoveIcon(tab.id)}
      </Flex>
    ),
  }));

  return (
    <div className="tabs">
      <AntTabs
        onChange={onChangeTab}
        items={items}
        activeKey={currentTab}
        type="editable-card"
        onEdit={handleChangeTabs}
      />
    </div>
  );
};

export default Tabs;
