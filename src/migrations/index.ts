import * as migration_20250612_120426_init from './20250612_120426_init';
import * as migration_20250618_175456_init from './20250618_175456_init';
import * as migration_20250622_194700_init from './20250622_194700_init';
import * as migration_20251122_185206 from './20251122_185206';

export const migrations = [
  {
    up: migration_20250612_120426_init.up,
    down: migration_20250612_120426_init.down,
    name: '20250612_120426_init',
  },
  {
    up: migration_20250618_175456_init.up,
    down: migration_20250618_175456_init.down,
    name: '20250618_175456_init',
  },
  {
    up: migration_20250622_194700_init.up,
    down: migration_20250622_194700_init.down,
    name: '20250622_194700_init',
  },
  {
    up: migration_20251122_185206.up,
    down: migration_20251122_185206.down,
    name: '20251122_185206'
  },
];
