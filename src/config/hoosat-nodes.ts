import type { HoosatClientConfig, NodeConfig } from 'hoosat-sdk';

export const DEFAULT_NODE_PORT = 42420;

const MAX_PORT = 65535;
const PORT_PATTERN = /^\d+$/;
const HOST_PATTERN = /^[^\s/]+$/;

/**
 * Parses the HOOSAT_NODES env value (`host:port,host:port`) into SDK node configs.
 * The port defaults to 42420, the first node becomes primary. IPv6 literals are not supported.
 * @throws {Error} when an entry has an invalid host or port
 */
export function parseNodes(raw: string | undefined): NodeConfig[] {
  if (!raw) {
    return [];
  }

  const entries = raw
    .split(',')
    .map(entry => entry.trim())
    .filter(entry => entry.length > 0);

  return entries.map((entry, index) => {
    const separator = entry.lastIndexOf(':');
    const host = (separator === -1 ? entry : entry.slice(0, separator)).trim();
    const portRaw = separator === -1 ? '' : entry.slice(separator + 1).trim();
    const port = portRaw === '' ? DEFAULT_NODE_PORT : Number(portRaw);
    const isPortValid = (portRaw === '' || PORT_PATTERN.test(portRaw)) && port >= 1 && port <= MAX_PORT;

    if (!HOST_PATTERN.test(host) || !isPortValid) {
      throw new Error(`Invalid HOOSAT_NODES entry: "${entry}"`);
    }

    return { host, port, primary: index === 0, name: `${host}:${port}` };
  });
}

type HoosatConnectionConfig = {
  host: string;
  port: number;
  timeout: number;
  nodes: NodeConfig[];
};

/**
 * Builds the HoosatClient config: multi-node with failover when nodes are configured,
 * otherwise the single node from HOOSAT_HOST / HOOSAT_PORT.
 */
export function buildClientConfig(config: HoosatConnectionConfig): HoosatClientConfig {
  if (config.nodes.length > 0) {
    return { nodes: config.nodes, timeout: config.timeout };
  }

  return { host: config.host, port: config.port, timeout: config.timeout };
}
