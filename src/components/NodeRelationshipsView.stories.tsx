import { CubeIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NodeRelationshipsView } from "./NodeRelationshipsView.js";

export default {
  title: "Components/NodeRelationshipsView",
  component: NodeRelationshipsView,
  args: {
    centerSidesVertically: false,
  },
} as ComponentMeta<typeof NodeRelationshipsView>;

const Template: ComponentStory<typeof NodeRelationshipsView> = (args) => (
  <div className="max-w-lg ">
    <NodeRelationshipsView {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      id: "endpoint",
      path: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      id: "image-scrapper",
      path: "image-scrapper",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-3",
        path: "function-3",
      },
    ],
    inbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-1",
        path: "function-1",
      },
    ],
    outbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-2",
        path: "function-2",
      },
    ],
  },
};

export const NoRelationships = Template.bind({});
NoRelationships.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      id: "endpoint",
      path: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      id: "image-scrapper",
      path: "image-scrapper",
    },
    children: [],
    inbound: [],
    outbound: [],
  },
};

export const UnevenItemCountI = Template.bind({});
UnevenItemCountI.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      id: "endpoint",
      path: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      id: "image-scrapper",
      path: "image-scrapper",
    },
    children: [],
    inbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "scrape-images",
        path: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-2",
        path: "function-2",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-3",
        path: "function-3",
      },
    ],
    outbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "scrape-images",
        path: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-2",
        path: "function-2",
      },
    ],
  },
};

export const UnevenItemCountII = Template.bind({});
UnevenItemCountII.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      id: "endpoint",
      path: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      id: "image-scrapper",
      path: "image-scrapper",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "scrape-images",
        path: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-2",
        path: "function-2",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-3",
        path: "function-3",
      },
    ],
    inbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "scrape-images",
        path: "scrape-images",
      },
    ],
    outbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "scrape-images",
        path: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "function-2",
        path: "function-2",
      },
    ],
  },
};

export const LongNames = Template.bind({});
LongNames.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      id: "silky-moreen-italian-2",
      path: "silky-moreen-italian-2",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      id: "social-barbey-canadian-4-social-barbey-canadian-4",
      path: "social-barbey-canadian-4-social-barbey-canadian-4",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "smooth-berte-african-3-smooth-berte-african-3",
        path: "smooth-berte-african-3-smooth-berte-african-3",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "annual-blisse-italian-3-annual-blisse-italian-3",
        path: "annual-blisse-italian-3-annual-blisse-italian-3",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "mutual-christean-european-9-mutual-christean-european-9",
        path: "mutual-christean-european-9-mutual-christean-european-9",
      },
    ],
    inbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "encouraging-dorrie-jewish-9",
        path: "encouraging-dorrie-jewish-9",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "delightful-annaliese-chinese-2",
        path: "delightful-annaliese-chinese-2",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "cooing-heath-german-7",
        path: "cooing-heath-german-7",
      },
    ],
    outbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "kind-shandra-jewish-6",
        path: "kind-shandra-jewish-6",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "gastric-dody-scottish-3",
        path: "gastric-dody-scottish-3",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "real-tedi-iraqi-7",
        path: "real-tedi-iraqi-7",
      },
    ],
  },
};

export const ManyRelationships = Template.bind({});
ManyRelationships.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      id: "endpoint",
      path: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      id: "mechanical-fania",
      path: "mechanical-fania",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "cornelius-bernhard",
        path: "cornelius-bernhard",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "awotwi-lanzo",
        path: "awotwi-lanzo",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "keld-robert",
        path: "keld-robert",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "identical-tabatha",
        path: "identical-tabatha",
      },
    ],
    inbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "hideous-chewy",
        path: "hideous-chewy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "quiet-ample",
        path: "quiet-ample",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "full-wet",
        path: "full-wet",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "impressive-tanitansy",
        path: "impressive-tanitansy",
      },
    ],
    outbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "stunning-crazy",
        path: "stunning-crazy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "dirty-jonis",
        path: "dirty-jonis",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "planned-courtney",
        path: "planned-courtney",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "victorious-nolana",
        path: "victorious-nolana",
      },
    ],
  },
};

export const ScrollableRelationships = Template.bind({});
ScrollableRelationships.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      id: "endpoint",
      path: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      id: "mechanical-fania",
      path: "mechanical-fania",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "cornelius-bernhard",
        path: "cornelius-bernhard",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "awotwi-lanzo",
        path: "awotwi-lanzo",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "keld-robert",
        path: "keld-robert",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "identical-tabatha",
        path: "identical-tabatha",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "cornelius-bernhard-2",
        path: "cornelius-bernhard-2",
      },
    ],
    inbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "hideous-chewy",
        path: "hideous-chewy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "quiet-ample",
        path: "quiet-ample",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "full-wet",
        path: "full-wet",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "impressive-tanitansy",
        path: "impressive-tanitansy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "hideous-chewy-2",
        path: "hideous-chewy-2",
      },
    ],
    outbound: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "stunning-crazy",
        path: "stunning-crazy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "dirty-jonis",
        path: "dirty-jonis",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "planned-courtney",
        path: "planned-courtney",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "victorious-nolana",
        path: "victorious-nolana",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        id: "stunning-crazy-2",
        path: "stunning-crazy-2",
      },
    ],
  },
};
