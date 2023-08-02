import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Write } from "./write";
import { Preview } from "./preview";
import { Button } from "../button";
import { Icon } from "@iconify/react";
import textHeader124Filled from "@iconify/icons-fluent/text-header-1-24-filled";
import textItalic24Filled from "@iconify/icons-fluent/text-italic-24-filled";
import textBold24Filled from "@iconify/icons-fluent/text-bold-24-filled";

const defaultText = `Build by @mxkaske, _powered by_ @shadcn **ui**.\n\nSupports raw <code>html</code>.`;

export function Markdown() {
  const [textValue, setTextValue] = React.useState(defaultText);

  return (
    <Tabs defaultValue="write" className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        {/* <div>
          <Button variant="ghost" size="sm" className="rounded-md px-2 py-0.5">
            <Icon icon={textHeader124Filled} className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="sm" className="rounded-md px-2 py-0.5">
            <Icon icon={textBold24Filled} className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="sm" className="rounded-md px-2 py-0.5">
            <Icon icon={textItalic24Filled} className="h-5 w-5" />
          </Button>
        </div> */}
      </div>
      <TabsContent value="write">
        <Write {...{ textValue, setTextValue }} />
      </TabsContent>
      <TabsContent value="preview">
        <Preview {...{ textValue }} />
      </TabsContent>
    </Tabs>
  );
}
