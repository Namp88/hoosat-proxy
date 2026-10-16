import hoosatConfig from './hoosat.config';

describe('hoosat config', () => {
  const originalNodes = process.env.HOOSAT_NODES;

  afterEach(() => {
    if (originalNodes === undefined) {
      delete process.env.HOOSAT_NODES;
    } else {
      process.env.HOOSAT_NODES = originalNodes;
    }
  });

  it('reads the node list from HOOSAT_NODES', () => {
    process.env.HOOSAT_NODES = 'htn.foztor.net:42420,htn-lon.foztor.net';

    expect(hoosatConfig().nodes.map(node => node.name)).toEqual(['htn.foztor.net:42420', 'htn-lon.foztor.net:42420']);
  });

  it('has no nodes when HOOSAT_NODES is unset', () => {
    delete process.env.HOOSAT_NODES;

    expect(hoosatConfig().nodes).toEqual([]);
  });
});
