import adapter from '@sveltejs/adapter-vercel';
 

const config = {
  kit: {
    adapter: adapter(),
  },
  vite: {
			ssr: {
				noExternal: ['swiper'] 
			}
		}
};

export default config;
