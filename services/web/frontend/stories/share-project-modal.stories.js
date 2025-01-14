import { useEffect } from 'react'
import ShareProjectModal from '../js/features/share-project-modal/components/share-project-modal'
import useFetchMock from './hooks/use-fetch-mock'
import { useScope } from './hooks/use-scope'
import { ScopeDecorator } from './decorators/scope'
import { contacts } from './fixtures/contacts'
import { project } from './fixtures/project'

export const LinkSharingOff = args => {
  useFetchMock(setupFetchMock)

  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'private',
    },
  })

  return <ShareProjectModal {...args} />
}

export const LinkSharingOn = args => {
  useFetchMock(setupFetchMock)

  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'tokenBased',
    },
  })

  return <ShareProjectModal {...args} />
}

export const LinkSharingLoading = args => {
  useFetchMock(setupFetchMock)

  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'tokenBased',
      tokens: undefined,
    },
  })

  return <ShareProjectModal {...args} />
}

export const NonAdminLinkSharingOff = args => {
  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'private',
    },
  })

  return <ShareProjectModal {...args} isAdmin={false} />
}

export const NonAdminLinkSharingOn = args => {
  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'tokenBased',
    },
  })

  return <ShareProjectModal {...args} isAdmin={false} />
}

export const RestrictedTokenMember = args => {
  // Override isRestrictedTokenMember to be true, then revert it back to the
  // original value on unmount
  // Currently this is necessary because the context value is set from window,
  // however in the future we should change this to set via props
  useEffect(() => {
    const originalIsRestrictedTokenMember = window.isRestrictedTokenMember
    window.isRestrictedTokenMember = true
    return () => {
      window.isRestrictedTokenMember = originalIsRestrictedTokenMember
    }
  })

  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'tokenBased',
    },
  })

  return <ShareProjectModal {...args} />
}

export const LegacyLinkSharingReadAndWrite = args => {
  useFetchMock(setupFetchMock)

  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'readAndWrite',
    },
  })

  return <ShareProjectModal {...args} />
}

export const LegacyLinkSharingReadOnly = args => {
  useFetchMock(setupFetchMock)

  useScope({
    project: {
      ...args.project,
      publicAccesLevel: 'readOnly',
    },
  })

  return <ShareProjectModal {...args} />
}

export const LimitedCollaborators = args => {
  useFetchMock(setupFetchMock)

  useScope({
    project: {
      ...args.project,
      features: {
        ...args.project.features,
        collaborators: 3,
      },
    },
  })

  return <ShareProjectModal {...args} />
}

export default {
  title: 'Editor / Modals / Share Project',
  component: ShareProjectModal,
  args: {
    show: true,
    animation: false,
    isAdmin: true,
    user: {},
    project,
  },
  argTypes: {
    handleHide: { action: 'hide' },
  },
  decorators: [ScopeDecorator],
}

function setupFetchMock(fetchMock) {
  const delay = 1000

  fetchMock
    // list contacts
    .get('express:/user/contacts', { contacts }, { delay })
    // change privacy setting
    .post('express:/project/:projectId/settings/admin', 200, { delay })
    // update project member (e.g. set privilege level)
    .put('express:/project/:projectId/users/:userId', 200, { delay })
    // remove project member
    .delete('express:/project/:projectId/users/:userId', 200, { delay })
    // transfer ownership
    .post('express:/project/:projectId/transfer-ownership', 200, {
      delay,
    })
    // send invite
    .post('express:/project/:projectId/invite', 200, { delay })
    // delete invite
    .delete('express:/project/:projectId/invite/:inviteId', 204, {
      delay,
    })
    // resend invite
    .post('express:/project/:projectId/invite/:inviteId/resend', 200, {
      delay,
    })
    // send analytics event
    .post('express:/event/:key', 200)
}
