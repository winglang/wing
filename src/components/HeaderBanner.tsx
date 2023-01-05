import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface HeaderBannerProps {
  title: string;
  buttonLabel: string;
  onClick: () => void;
  onClose: () => void;
}

export const HeaderBanner = ({
  buttonLabel,
  onClick,
  title,
  onClose,
}: HeaderBannerProps) => {
  return (
    <div className="bg-monada-light">
      <div className="mx-auto max-w-7xl py-3 px-3 px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-transparent p-2">
              <MegaphoneIcon
                className="h-6 w-6 text-monada-black"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate font-medium text-monada-black">
              {title}
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              className="flex items-center justify-center rounded-md border border-transparent bg-monada-dark px-4 py-2 text-sm font-medium text-monada-black shadow-sm"
              onClick={onClick}
            >
              {buttonLabel}
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="-mr-1 flex rounded-md p-2"
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon
                className="h-6 w-6 text-monada-dark"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
