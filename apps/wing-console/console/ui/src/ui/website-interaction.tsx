import {Attribute, useTheme} from "@wingconsole/design-system";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/solid"
import { AppMode } from "../AppContext.js";
import classNames from "classnames";

export interface WebsiteInteractionProps {
    url: string;
    appMode: AppMode;
    onUrlClick: (url: string) => void;
}
export const WebsiteInteraction = ({appMode, url, onUrlClick}: WebsiteInteractionProps) => {
    const {theme} = useTheme();
    return (
        <div className="h-full flex-1 flex flex-col text-sm space-y-1">
            <div className="relative grow flex-row flex items-center">
                {appMode === "local" && (
                    <>
                        <Attribute name="URL" value={url} noLeftPadding />
                        <ArrowTopRightOnSquareIcon
                            className={classNames(theme.text2, "text-sm flex ml-2 h-4 w-4 cursor-pointer")}
                            onClick={() => onUrlClick(url)}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
