import { CubeIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NodeRelationshipsView } from "./NodeRelationshipsView";

export default {
  title: "Playground/NodeRelationshipsView",
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
      name: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      name: "image-scrapper",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-3",
      },
    ],
    callers: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-1",
      },
    ],
    callees: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-2",
      },
    ],
  },
};

export const NoRelationships = Template.bind({});
NoRelationships.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      name: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      name: "image-scrapper",
    },
    children: [],
    callers: [],
    callees: [],
  },
};

export const UnevenItemCountI = Template.bind({});
UnevenItemCountI.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      name: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      name: "image-scrapper",
    },
    children: [
      // {
      //   icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
      //   name: "scrape-images",
      // },
      // {
      //   icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
      //   name: "function-2",
      // },
      // {
      //   icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
      //   name: "function-3",
      // },
    ],
    callers: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-2",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-3",
      },
    ],
    callees: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-2",
      },
    ],
  },
};

export const UnevenItemCountII = Template.bind({});
UnevenItemCountII.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      name: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      name: "image-scrapper",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-2",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-3",
      },
    ],
    callers: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "scrape-images",
      },
      // {
      //   icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
      //   name: "function-2",
      // },
      // {
      //   icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
      //   name: "function-3",
      // },
    ],
    callees: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "scrape-images",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "function-2",
      },
    ],
  },
};

export const LongNames = Template.bind({});
LongNames.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      name: "silky-moreen-italian-2",
      // name: "silky",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      name: "social-barbey-canadian-4-social-barbey-canadian-4",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "smooth-berte-african-3-smooth-berte-african-3",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "annual-blisse-italian-3-annual-blisse-italian-3",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "mutual-christean-european-9-mutual-christean-european-9",
      },
    ],
    callers: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "encouraging-dorrie-jewish-9",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "delightful-annaliese-chinese-2",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "cooing-heath-german-7",
      },
    ],
    callees: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "kind-shandra-jewish-6",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "gastric-dody-scottish-3",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "real-tedi-iraqi-7",
      },
    ],
  },
};

export const ManyRelationships = Template.bind({});
ManyRelationships.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      name: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      name: "mechanical-fania",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "cornelius-bernhard",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "awotwi-lanzo",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "keld-robert",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "identical-tabatha",
      },
    ],
    callers: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "hideous-chewy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "quiet-ample",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "full-wet",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "impressive-tanitansy",
      },
    ],
    callees: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "stunning-crazy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "dirty-jonis",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "planned-courtney",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "victorious-nolana",
      },
    ],
  },
};

export const ScrollableRelationships = Template.bind({});
ScrollableRelationships.args = {
  relationships: {
    self: {
      icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
      name: "endpoint",
    },
    parent: {
      icon: <CubeIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
      name: "mechanical-fania",
    },
    children: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "cornelius-bernhard",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "awotwi-lanzo",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "keld-robert",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "identical-tabatha",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "cornelius-bernhard",
      },
    ],
    callers: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "hideous-chewy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "quiet-ample",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "full-wet",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "impressive-tanitansy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "hideous-chewy",
      },
    ],
    callees: [
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "stunning-crazy",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "dirty-jonis",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "planned-courtney",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "victorious-nolana",
      },
      {
        icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
        name: "stunning-crazy",
      },
    ],
  },
};
