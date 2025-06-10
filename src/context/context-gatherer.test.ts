import { getContext, getCommandHistory, getProjectFileContext } from './context-gatherer';

describe('Context Gatherer', () => {
  it('returns current directory and command history placeholder', () => {
    const context = getContext();
    expect(context).toMatch(/Current directory:/);
    expect(context).toMatch(/Command history:/);
  });

  it('returns command history placeholder', () => {
    const history = getCommandHistory();
    expect(history).toMatch(/not implemented/);
  });

  it('returns project file context placeholder', () => {
    const projectContext = getProjectFileContext();
    expect(projectContext).toMatch(/not implemented/);
  });
});
