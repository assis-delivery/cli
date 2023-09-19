import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface DeployOptions {
  googleApplicationCredentialsJson: object;
  googleApplicationCredentialsFilename: string;
  projectId: string;
}

export async function deploy(options: DeployOptions): Promise<void> {
  const {
    googleApplicationCredentialsJson,
    googleApplicationCredentialsFilename,
    projectId,
  } = options;
  const googleApplicationCredentialsPath = join(
    process.cwd(),
    googleApplicationCredentialsFilename,
  );
  await writeFile(
    googleApplicationCredentialsPath,
    JSON.stringify(googleApplicationCredentialsJson),
  );
  spawnSync('firebase', ['use', projectId], {
    stdio: 'inherit',
    shell: true,
  });
  spawnSync('firebase', ['deploy', '--only', 'functions', '-f'], {
    shell: true,
    stdio: 'inherit',
  });
}
