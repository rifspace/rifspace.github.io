export const initialPosts = [
  {
    id: 1,
    category: 'Photoshop Tips',
    title: 'Cinematic Color Grading in 5 Steps',
    author: 'Rif',
    date: 'Oct 12, 2024',
    readTime: '8 min',
    excerpt: 'Master the art of cinematic color grading with these pro techniques. Turn dull footage into movie magic.',
    content: `
      <p>Color grading is what separates the amateurs from the pros. It's not just about slapping a filter on; it's about evoking emotion. In this tutorial, we're breaking down the teal and orange look, but doing it right.</p>
      
      <h3>Step 1: Balance Your Footage</h3>
      <p>Before you grade, you must correct. Ensure your white balance is neutral and your exposure is balanced. You can't build a house on a shaky foundation.</p>

      <h3>Step 2: The Curves Adjustment</h3>
      <p>Create an S-curve. Lift the shadows slightly for that faded film look, and crush the blacks just a touch to keep contrast. This is where the mood begins.</p>

      <h3>Step 3: Color Wheels</h3>
      <p>Push teal into your shadows and orange into your highlights. But be subtle! The key is in the midtones. Keep skin tones natural.</p>

      <blockquote>"Color is a power which directly influences the soul." - Wassily Kandinsky</blockquote>

      <p>Experiment with these settings. Break the rules once you know them. That's the rifspace way.</p>
    `,
    imageAlt: 'Cinematic color grading interface showing curves and color wheels',
    tags: ['Advanced', 'Color', 'Cinema']
  },
  {
    id: 2,
    category: 'Design',
    title: 'Typography Rules You Should Break',
    author: 'Rif',
    date: 'Oct 15, 2024',
    readTime: '5 min',
    excerpt: 'Bold typography experiments that push creative boundaries. Why legibility is sometimes overrated.',
    content: `
      <p>They told you to keep it readable. They told you to use grid systems. We say: make it chaotic. Brutalist design is back, and it loves broken typography.</p>
      
      <h3>1. Stretching Fonts</h3>
      <p>Don't just scale; stretch. Distort the aspect ratio. Make the viewer uncomfortable. It catches the eye because it feels "wrong".</p>

      <h3>2. Overlapping Text</h3>
      <p>Let text interact with images. Let headers crash into paragraphs. Create layers of meaning that require deciphering.</p>

      <h3>3. Giant Type</h3>
      <p>If they can ignore it, it's too small. Fill the viewport. Make the word the image itself.</p>
    `,
    imageAlt: 'Experimental typography poster with stretched and overlapping text',
    tags: ['Beginner', 'Typography', 'Brutalism']
  },
  {
    id: 3,
    category: 'Photo Editing',
    title: 'The Moody Portrait Workflow',
    author: 'Sarah X',
    date: 'Oct 20, 2024',
    readTime: '12 min',
    excerpt: 'Step-by-step guide to creating atmospheric portrait edits using Lightroom and Photoshop.',
    content: `
      <p>Mood isn't found; it's created. In this workflow, we explore how to take a standard studio shot and turn it into a piece of emotional art.</p>
      
      <h3>Lighting in Post</h3>
      <p>We'll use dodge and burn techniques to sculpt light where it didn't exist. This creates depth and drama.</p>
      
      <h3>Texture Overlay</h3>
      <p>Adding grain and scratches isn't about looking "retro"—it's about adding tactile feeling to a digital image.</p>
    `,
    imageAlt: 'Moody portrait photography with dramatic lighting and grain',
    tags: ['Intermediate', 'Portrait', 'Dark']
  },
  {
    id: 4,
    category: 'Illustrator Tips',
    title: 'Vector Chaos: From Sketch to Art',
    author: 'Rif',
    date: 'Nov 01, 2024',
    readTime: '10 min',
    excerpt: 'Transform rough sketches into clean, scalable vector artwork without losing the raw energy.',
    content: `
      <p>Vectors often feel sterile. Too perfect. Here is how to keep the "hand-drawn" grit while maintaining infinite scalability.</p>
      
      <h3>The Roughen Effect</h3>
      <p>Illustrator's best kept secret. Effect > Distort & Transform > Roughen. It adds organic imperfection to your perfect paths.</p>
      
      <h3>Custom Brushes</h3>
      <p>Stop using the default round brush. Create art brushes from scanned ink splatters.</p>
    `,
    imageAlt: 'Vector illustration workflow showing sketch to final gritty vector',
    tags: ['Advanced', 'Vector', 'Illustration']
  },
  {
    id: 5,
    category: 'Design',
    title: 'Anti-Design: The New Aesthetic',
    author: 'Rif',
    date: 'Nov 05, 2024',
    readTime: '7 min',
    excerpt: 'Embracing ugliness, asymmetry, and raw HTML elements to stand out in a polished web.',
    content: `
      <p>When everything looks like a template, "ugly" becomes beautiful. Anti-design challenges the user's expectations of what a website should be.</p>
      
      <p>Use system fonts. Use default blue links. strip away the CSS and then add it back in the wrong places. It's about honesty in structure.</p>
    `,
    imageAlt: 'Anti-design website layout with raw HTML elements and clashing colors',
    tags: ['Theory', 'Web Design', 'Trend']
  },
  {
    id: 6,
    category: 'Photoshop Tips',
    title: 'Glitch Art Mastery',
    author: 'GlitchGod',
    date: 'Nov 12, 2024',
    readTime: '15 min',
    excerpt: 'Corrupt your files on purpose. A guide to datamoshing and pixel sorting in Photoshop.',
    content: `
      <p>Destruction is a form of creation. Glitch art isn't just random; it's controlled chaos.</p>
      
      <h3>Channel Shifting</h3>
      <p>Unlock your background layer. Double click to open Layer Styles. Turn off the 'R' channel. Nudge the layer. Instant 3D anaglyph glitch.</p>
      
      <h3>Wind Filter</h3>
      <p>The classic. Rotate your canvas 90 degrees. Apply Filter > Stylize > Wind. Rotate back. It gives that "fast data" look.</p>
    `,
    imageAlt: 'Glitch art portrait with pixel sorting and channel shifting effects',
    tags: ['Experimental', 'Glitch', 'Art']
  }
];

export const getPosts = () => {
  const stored = localStorage.getItem('rifspace_posts');
  if (!stored) {
    localStorage.setItem('rifspace_posts', JSON.stringify(initialPosts));
    return initialPosts;
  }
  return JSON.parse(stored);
};

export const getPostById = (id) => {
  const posts = getPosts();
  return posts.find(p => p.id === parseInt(id));
};

export const savePost = (post) => {
  const posts = getPosts();
  if (post.id) {
    // Edit existing
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...post };
    }
  } else {
    // Create new
    const newId = Math.max(...posts.map(p => p.id), 0) + 1;
    posts.unshift({ ...post, id: newId, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
  }
  localStorage.setItem('rifspace_posts', JSON.stringify(posts));
  return posts;
};

export const deletePost = (id) => {
  const posts = getPosts();
  const filtered = posts.filter(p => p.id !== id);
  localStorage.setItem('rifspace_posts', JSON.stringify(filtered));
  return filtered;
};