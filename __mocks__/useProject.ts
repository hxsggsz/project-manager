import { useCreateProject } from '../src/hooks/useProject'

jest.mock('../src/hooks/useProject', () => ({
  useCreateProjectt: jest.fn(),
}))
