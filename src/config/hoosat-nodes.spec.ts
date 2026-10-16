import { buildClientConfig, DEFAULT_NODE_PORT, parseNodes } from './hoosat-nodes';

describe('parseNodes', () => {
  it('parses host:port entries, defaults the port and marks only the first node primary', () => {
    expect(parseNodes('htn.foztor.net:42421,51.89.232.58')).toEqual([
      { host: 'htn.foztor.net', port: 42421, primary: true, name: 'htn.foztor.net:42421' },
      { host: '51.89.232.58', port: DEFAULT_NODE_PORT, primary: false, name: '51.89.232.58:42420' },
    ]);
  });

  it('trims whitespace and skips empty entries', () => {
    const nodes = parseNodes(' a.example:1 , ,b.example:2 ,');

    expect(nodes.map(node => [node.host, node.port])).toEqual([
      ['a.example', 1],
      ['b.example', 2],
    ]);
  });

  it.each([undefined, '', ' , ,'])('returns no nodes for %p', raw => {
    expect(parseNodes(raw)).toEqual([]);
  });

  it.each([
    'a.example:abc',
    'a.example:0',
    'a.example:70000',
    'a.example:1.5',
    'a.example:1e3',
    'a.example:0x10',
    'a.example:+80',
    ':42420',
    'a b.example:1',
    'http://a.example:1',
  ])('rejects invalid entry %p', raw => {
    expect(() => parseNodes(raw)).toThrow(`Invalid HOOSAT_NODES entry: "${raw}"`);
  });

  it('falls back to the default port when the port after the separator is empty', () => {
    expect(parseNodes('a.example:')).toEqual([{ host: 'a.example', port: DEFAULT_NODE_PORT, primary: true, name: 'a.example:42420' }]);
  });
});

describe('buildClientConfig', () => {
  const base = { host: '127.0.0.1', port: 42420, timeout: 10000 };

  it('uses the node list when nodes are configured', () => {
    const nodes = parseNodes('a.example:1,b.example:2');

    expect(buildClientConfig({ ...base, nodes })).toEqual({ nodes, timeout: 10000 });
  });

  it('keeps the single-node config when no nodes are configured', () => {
    expect(buildClientConfig({ ...base, nodes: [] })).toEqual({ host: '127.0.0.1', port: 42420, timeout: 10000 });
  });
});
