import { test } from '@playwright/test';
import { EtlPage } from '../pages/etl.page';

test.describe('Agent Studio - ETL Module', () => {

  let etl: EtlPage;

  test.beforeEach(async ({ page }) => {
    etl = new EtlPage(page);
    await etl.navigateToEtl();
  });

  test('@smoke @ui Verify ETL loads', async () => {
    console.log("ETL Loaded");
  });

  test('@sanity Create Source', async () => {
    await etl.createSource();
  });

  test('@regression Create Destination', async () => {
    await etl.createDestination(true);
  });

  test('@regression Create Connection and Sync', async () => {
    await etl.createSource();
    await etl.createDestination(true);
    await etl.createConnection();
    await etl.performSync();
  });

  test('@negative Invalid Port Test', async () => {
    await etl.createDestination(false);
  });

});