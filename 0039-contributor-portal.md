# Contributor Portal (aka "Monadaland")

The contributor portal ("portal") is a home for Monada's open-source
contributors and maintainers. It allows contributors to learn about Monada,
learn about cloud development, explore the various projects we are currently
working on, find opportunities for contribution and more.

## Design

This section describes the *concept* for the portal's desired experience. It is
meant to provide an idea for the use cases and story.

### Waitlist

Let's say that I am just a curious little bee and I go to https://monada.co
without an invite code or anything.

I see the Monada terminal pop up. Looks like a shell:

```sh
(try 'help') 
$
```

If I am a hacker, I'd be exploring this terminal. For example, I'd type `help`
and of course I immediately switch to a dark theme (because I am hacker after
all):

```sh
(try 'help') 
$ help
cat - concatenate files and print on the standard output
clear - clear the terminal screen
echo - write arguments to the standard output
help - display the available commands
ls - list directory contents
theme - toggle the terminal theme
$ theme
Switched to dark theme.
```

Eventually, if I am worthy, I'll get to run `cat WAITLIST`:

> This is intentionally hidden as long as we are still in stealth mode.

```sh
$ cat WAITLIST
https://monadahq.typeform.com/waitlist
```

And if I am really curious, I'd browse to this link and find myself with a [cute
little Typeform](https://monadahq.typeform.com/waitlist) that invites me to join the party:

```

           +--------+
           |  111   |
           | monada |
           +---------

If you got here, you are our kind of person!
...but we are just not ready yet :-)

    [Sign up to our waitlist]

```

> The typeform will collect some info from the user and will add them to our [Beta
> Pipedrive](https://monadahq.pipedrive.com/pipeline/1) so we can follow up with
> them with an invite.

### Invites

I wake up one morning and find this in my inbox/LinkedIn/WhatsApp/Twitter:

```
From: monabot@monada.co
To: ferry.berry@gmail.com
Subject: We'd like to invite you to our private beta at Monadaland!

Hi Ferry Berry,

So, you remember when you were a curious hacker and found our
signup link in the Monada terminal? So, the day has come when we are
finally ready for you to come over and play with us.

Without further ado, ready to jump into the rabbit hole?

    [-----------------------------------------------------]
    [                                                     ]
    [           IMAGE OF SOMETHING EXCITING               ]
    [                                                     ]
    [           https://contribute.monada.co              ]
    [                                                     ]
    [-----------------------------------------------------]

(this link can only be used once, so please don't share it)

When you sign up we will ask you a few questions about yourself and your work.

See you on the other side!
The Monadians!
```

**Note: P0 will not include invite codes, as we will specifically grant permissions beforehand to GitHub users** 

### Down the rabbit hole [P1]

I click on the link and my browser navigates to a page that initially looks like
the Monada terminal:

```sh
(try 'help')
$
```

But then, something happens... Something is being typed on my terminal:

```sh
(try 'help')
$ echo "349487xnx98324" > /dev/invite
```

OK, I press ENTER and a progress bar appears:

```sh
(try 'help')
$ echo "349487xnx98324" > /dev/invite
██████████████████████████████████████░░░░░░░░░░░░░░░░
```

When it reaches 100%, I fall down the rabbit hole:

```
[--------------------------------------]
[ IMMERSIVE EXPERIENCE OF FALLING      ]
[ DOWN THE RABBIT HOLE/INTO THE MATRIX ]
[ OR WHATEVER, BEAUTIFUL AND EXCITING  ]
[--------------------------------------]
```

This is getting exciting...

### Sign up [P0]

Now, I am being redirected to https://contribute.monada.co (P1 adds `?invite=349487xnx98324`)
and from there, I am requested to sign in with my GitHub account through GitHub
Oauth (looks [like
this](https://user-images.githubusercontent.com/3988879/40750372-4c5ae452-6424-11e8-8eda-67d03ca548fc.png).
I click **Authorize Monabot** and move on.

>
> Implementation notes:
>
> 1. This is where we add the GitHub user to the
>    [external](https://github.com/orgs/monadahq/teams/external) GitHub team
>    which controls access to our repositories and to Monadaland.
> 2. If a user without an invite code tries to access
>    https://contribute.monada.co, they will be redirected to https://monada.co. (P1)
>

Next thing I am being escorted to another Typeform which collects some more
information about myself, my job, my passion, my company. 

> **Implementation note**: This information is important in order to allow us to
> create a useful contributor profile and be able to work with contributors
> effectively. Bear in mind that some of this information is likely already been
> included in the waitlist sheet, so maybe we don't need all of it.

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  Welcome to Monadaland!                                                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  Let's start by creating your Monada contributor profile.                           │
│                                                                                     │
│  * Name:     [_______________________________] (pre-filled from GitHub)             │
│  * Email:    [_______________________________] (pre-filled from GitHub)             │
│                                                                                     │
├─ Demographics: ─────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  * Birth date: [00/0/0000] (optional)                                               │
│  * Location:   [                              ] (optional)                          │
│  * Gender:     [                              ] (optional)                          │
│  * Languages:  [                              ] (optional)                          │
│                                                                                     │
├─ Profiles: ─────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  * GitHub:    [                               ] (pre-filled from GitHub)            │
│  * LinkedIn:  [                               ] (optional)                          │
│  * Twitter:   [                               ] (optional)                          │
│  * TikTok:    [                               ] (optional)                          │
│  * Instagram: [                               ] (optional)                          │
│                                                                                     │
├─ Your work: ────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  * Company size                                                                     │
│  * Role: Dev/DevOps/...                                                             │
│  * Industry:                                                                        │
│  * Programming Languages:                                                           │
│  * Other questions (see the questions in https://namespacelabs.com/ as an example)  │
│                                                                                     │
│  [CREATE PROFILE]                                                                   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Home Page

I finally land in Monadaland!

> This is where users land if they are already signed up and go to
> https://contribute.monada.co.

```
┌──────────────────────────────────────────────────────┬───(my profile)────┐
│                                                      │                   │
│   Welcome to Monadaland!                             │    ┌────────┐     │
│                                                      │    │        │     │
│   ┌─────────────────────────────────────────────┐    │    │(avatar)│     │
│   │┼┼────────────────────┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│    │    │        │     │
│   │┼│Art/Introduction Video  │┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│    │    └────────┘     │
│   │┼┼────────────────────┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│    │  Elad Ben-Israel  │
│   │┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼│    │                   │
│   └─────────────────────────────────────────────┘    │    1248 Points    │
│                                                      │ Level: Officer    │
├───────────────────────────────────┬──────────────────┴───────────────────┤
│ Library                           │ What are we working on?              │
├───────────────────────────────────┼──────────────────────────────────────┤
│ Getting started               >>  │ RFCs                       STAGE     │
│ CDK workshop                  >>  │ #122 Winglang Spec         Last call │
│ Wing Docs                     >>  │ #22  Wingers Community     Revision  │
│ My first contribution         >>  │                                      │
│ ...                               │ PRs  TITLE                  REPO     │
│                                   │ #12  feat: Website resource wingsdk  │
├───────────────────────────────────┤ #33  fix: bad capture       winglang │
│ Help Wanted                       │ ...                                  │
├───────────────────────────────────┤                                      │
│ #22 GCP target for Queue  wingsdk │                                      │
│ ...                               │                                      │
│                                   │                                      │
│                                   │                                      │
│                                   │                                      │
│                                   │                                      │
│                                   │                                      │
└───────────────────────────────────┴──────────────────────────────────────┘
```

The following sections include high-level descriptions of the various elements
in the home screen (subject to extension and change in the future of course).

Features are marked with MVP priority where:
* **[P0]** is **must** for MVP
* **[P1]** is **nice to have** for MVP
* **[P2]** is **out of scope** for MVP (roadmap item).

### Header [P0]

When the user first signs into the portal, the header will include an
orientation video that welcomes them to the site and guides them through a high
level overview of the portal. [P1]

When users get back to the portal, the header will include art [P0].

Artwork will be curated from artists and the community through NFTs [P2].

### Library Section [P0]

The library is a curated list of links to articles, workshops, HOW TOs,
tutorials, blog posts, etc. This is where users can find information on how to
get started, setup their environments and contribution best practices.
Additionally, we plan to include references to educational material about cloud
programming, CDK, etc.

Features:

* Clicking on an item in the list will open a new tab with the content. [P0]
* Users can "mark as read" and filter out any articles that were already marked [P2]
* Users can "pin" an item and it will always appear at the top of the list (even if read) [P2]

### "What are we working on?" Section [P0]

This is where users can discover which projects we currently work on at Monada.
The section includes two sub-sections: Pull Requests [P0] and RFCs [P1].

Under **Pull Requests** [P0] we will link pull requests from across our
repositories that are labeld with the `featured` label. Each PR will show the
issue number, title and author [P0]. When clicking on a PR, a new tab will be
opened with the pull request. Based on the [conventional commit] title of the PR, items
will be marked "feature", "bugfix" or "other" [P1].

[conventional commit]: https://www.conventionalcommits.org/en/v1.0.0/

Under **RFCs** [P1], we will show pull requests for RFCs (labeld `rfc` and
`featured`) [P0]. For each RFC we will show the issue number [P0], title [P0]
and author [P0] as well as the stage of the RFC [P1] (based on labels). It will
also have a "view" link [P0] which will browse to the **rendered version** of
the RFC and a "review" link [P0] which will browse to the pull request of the
RFC.

### "Help Wanted" Section [P1]

This section will included a list of GitHub issues that contributors can pick up
and help with. Issues are collected from across our repositories based on the
label `help wanted` and that they are not assigned to anyone.

* For each issue, the issue number, title and issue type (bug/feature request)
  is presented.
* Issue priority [P0]
* Issue difficulty level is marked based on labels [P2] - this can help users
  determine if they are ready to pick up an issue.
* Estimated work [P2] - this needs to be normalized (perhaps based on contributor level?)
* A workflow for requesting to pick up an issue [P2] (contributor can request to
  work on an issue and needs to get an approval from a maintainer).

### Contributor Profile [P0]

This section shows the contributor's profile picture [P0], name [P0], social
links [P0], contributor score [P2] and badges [P2].

The high-level idea behind the contributor score and badges is that we are
thinking of adding some gamification aspects to encourage contributors to help
and be part of the community. For example, if a contributor picks up an issue
from the "help wanted" section, they get more points than when they contribute
another type of issue. If they review someone else's work, they get points, etc.
If they pick up higher priority or more difficult tasks, they get more points
etc. Eventually we can give rewards, free trips to visit the Monadaland theme
park in Bat Yam, etc.

In the future perhaps we can also include a contributor leaderboard [P2].

## Implementation

Some assumptions/ideas/constraints:

* **Authentication & Authorization**: we will use GitHub to authenticate and a
  GitHub Organization Team to authorize who has access to our repositories and
  to the contributor portal.
* **Backoffice**: we want to use Pipedrive to manage our beta program (this
  includes both community members and design partners). Associate will occur through
  a webhook for Pipedrive that will listen to labels being added to a deal. This will
  create an invite code in Pipedrive against the deal. During validation an API endpoint
  will validate the authenticated GitHub user against Pipedrive and the code related to 
  the user/deal. If this becomes problematic because of Pipedrive's API, we can make a DDB
  table the source of record for invite codes.
* The **waitlist** and **registration** Typeforms needs detailed design and help
  from the product team, so we collect the information we need for the beta. The
  current form is minimal, but I think we need more. See the questions in
  https://namespacelabs.com/ for inspiration.
