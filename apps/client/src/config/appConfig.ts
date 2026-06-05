const APP_CONFIG = {
  TEST_LOADING: true,
  TEST_LOADING_DELAY: 1000,
};

export async function getTestLoadingDelay() {
  if (APP_CONFIG.TEST_LOADING) {
    await new Promise((resolve) => setTimeout(resolve, APP_CONFIG.TEST_LOADING_DELAY));
  }
}


