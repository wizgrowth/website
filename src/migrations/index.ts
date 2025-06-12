import * as migration_20250612_120426_init from './20250612_120426_init';

export const migrations = [
  {
    up: migration_20250612_120426_init.up,
    down: migration_20250612_120426_init.down,
    name: '20250612_120426_init'
  },
];
