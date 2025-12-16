import * as migration_20250612_120426_init from './20250612_120426_init';
import * as migration_20250618_175456_init from './20250618_175456_init';
import * as migration_20250622_194700_init from './20250622_194700_init';
import * as migration_20251123_121146_restore_prefix_column from './20251123_121146_restore_prefix_column';
import * as migration_20251216_195830_schema from './20251216_195830_schema';

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
    up: migration_20251123_121146_restore_prefix_column.up,
    down: migration_20251123_121146_restore_prefix_column.down,
    name: '20251123_121146_restore_prefix_column',
  },
  {
    up: migration_20251216_195830_schema.up,
    down: migration_20251216_195830_schema.down,
    name: '20251216_195830_schema'
  },
];
