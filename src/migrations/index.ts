import * as migration_20250612_120426_init from './20250612_120426_init';
import * as migration_20250618_175456_init from './20250618_175456_init';
import * as migration_20250622_194700_init from './20250622_194700_init';
import * as migration_20251123_121146_restore_prefix_column from './20251123_121146_restore_prefix_column';
import * as migration_20251216_195830_schema from './20251216_195830_schema';
import * as migration_20260509_075007 from './20260509_075007';
import * as migration_20260517_151747_academy from './20260517_151747_academy';
import * as migration_20260909_133444_blog_article_revamp from './20260909_133444_blog_article_revamp';
import * as migration_20260909_180911_service_pages from './20260909_180911_service_pages';
import * as migration_20260909_181500_seed_service_pages from './20260909_181500_seed_service_pages';
import * as migration_20260910_093000_trim_blog_slugs from './20260910_093000_trim_blog_slugs';
import * as migration_20260915_193101_blog_featured from './20260915_193101_blog_featured';
import * as migration_20260917_131010_hide_from_sitemap from './20260917_131010_hide_from_sitemap';

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
    name: '20251216_195830_schema',
  },
  {
    up: migration_20260509_075007.up,
    down: migration_20260509_075007.down,
    name: '20260509_075007',
  },
  {
    up: migration_20260517_151747_academy.up,
    down: migration_20260517_151747_academy.down,
    name: '20260517_151747_academy',
  },
  {
    up: migration_20260909_133444_blog_article_revamp.up,
    down: migration_20260909_133444_blog_article_revamp.down,
    name: '20260909_133444_blog_article_revamp',
  },
  {
    up: migration_20260909_180911_service_pages.up,
    down: migration_20260909_180911_service_pages.down,
    name: '20260909_180911_service_pages',
  },
  {
    up: migration_20260909_181500_seed_service_pages.up,
    down: migration_20260909_181500_seed_service_pages.down,
    name: '20260909_181500_seed_service_pages',
  },
  {
    up: migration_20260910_093000_trim_blog_slugs.up,
    down: migration_20260910_093000_trim_blog_slugs.down,
    name: '20260910_093000_trim_blog_slugs',
  },
  {
    up: migration_20260915_193101_blog_featured.up,
    down: migration_20260915_193101_blog_featured.down,
    name: '20260915_193101_blog_featured',
  },
  {
    up: migration_20260917_131010_hide_from_sitemap.up,
    down: migration_20260917_131010_hide_from_sitemap.down,
    name: '20260917_131010_hide_from_sitemap',
  },
];
