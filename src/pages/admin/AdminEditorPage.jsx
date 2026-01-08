import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { Save, ArrowLeft, Image as ImageIcon, Type, Calendar as CalendarIcon, User, Tag, Eye, EyeOff, Bold, Italic, Link as LinkIcon, Quote, Code, List, Undo, Redo, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.jsx';
import { getPostById, savePost } from '@/lib/blogData.js';
import { useToast } from '@/components/ui/use-toast.js';

const AdminEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isEditing = !!id;

    const [showPreview, setShowPreview] = useState(true);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Helper to add to history
    const addToHistory = (newContent) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newContent);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const [formData, setFormData] = useState({
        title: 'Untitled Tutorial',
        author: 'Rif',
        date: new Date(),
        readTime: '5 min',
        category: 'Design',
        tags: '',
        excerpt: '',
        content: '',
        imageAlt: 'Cover Image',
        image: 'https://images.unsplash.com/photo-1595872018818-97555653a011'
    });

    // Initialize history
    useEffect(() => {
        if (history.length === 0 && formData.content) {
            setHistory([formData.content]);
            setHistoryIndex(0);
        }
    }, [formData.content, history.length]);

    useEffect(() => {
        if (isEditing) {
            const post = getPostById(id);
            if (post) {
                setFormData({
                    ...post,
                    date: new Date(post.date), // Ensure date object
                    tags: post.tags ? post.tags.join(', ') : ''
                });
            }
        }
    }, [id, isEditing]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'content') {
            // Debounce history addition? For now direct
            addToHistory(value);
        }
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setFormData(prev => ({ ...prev, content: history[newIndex] }));
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setFormData(prev => ({ ...prev, content: history[newIndex] }));
        }
    };

    // Validate Image Helper
    const validateImage = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const { width, height } = img;
                const ratio = width / height;
                const targetRatio = 16 / 9;
                const tolerance = 0.05; // Strict 16:9

                if (width < 800 || height < 450) {
                    reject('Image too small. Minimum 800x450 required.');
                    return;
                }

                if (Math.abs(ratio - targetRatio) > tolerance) {
                    reject(`Invalid aspect ratio. 16:9 required. (Your image: ${width}x${height})`);
                    return;
                }

                resolve(true);
            };
            img.onerror = () => reject('Invalid image file.');
        });
    };

    // Drag & Drop for Cover Image
    const onDropCover = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            try {
                await validateImage(file);

                // Convert to Base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData(prev => ({ ...prev, image: reader.result }));
                    toast({ title: "Image Uploaded", description: "Cover image updated successfully." });
                };
                reader.readAsDataURL(file);

            } catch (error) {
                toast({
                    title: "Image Validation Failed",
                    description: error,
                    variant: "destructive"
                });
            }
        }
    }, [toast]);

    const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps, isDragActive: isCoverDragActive } = useDropzone({
        onDrop: onDropCover,
        accept: { 'image/*': [] },
        multiple: false,
        noClick: true // Only drag drop
    });

    // Editor Markdown Insertion
    const insertMarkdown = (syntax, placeholder = '') => {
        const textarea = document.getElementById('markdown-editor');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.content;
        const before = text.substring(0, start);
        const selection = text.substring(start, end) || placeholder;
        const after = text.substring(end);

        let newText = '';
        let newCursorPos = 0;

        switch (syntax) {
            case 'bold': newText = `${before}**${selection}**${after}`; newCursorPos = end + 4; break;
            case 'italic': newText = `${before}*${selection}*${after}`; newCursorPos = end + 2; break;
            case 'h2': newText = `${before}\n## ${selection}\n${after}`; newCursorPos = end + 4; break;
            case 'h3': newText = `${before}\n### ${selection}\n${after}`; newCursorPos = end + 5; break;
            case 'link': newText = `${before}[${selection}](url)${after}`; newCursorPos = end + 3; break;
            case 'quote': newText = `${before}\n> ${selection}\n${after}`; newCursorPos = end + 3; break;
            case 'code': newText = `${before}\`\`\`\n${selection}\n\`\`\`\n${after}`; newCursorPos = end + 4; break;
            case 'list': newText = `${before}\n- ${selection}\n${after}`; newCursorPos = end + 3; break;
            default: newText = text;
        }

        setFormData(prev => ({ ...prev, content: newText }));
        addToHistory(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleSave = () => {
        if (!formData.title || !formData.content) {
            toast({ title: "Validation Error", description: "Title and Content are required.", variant: "destructive" });
            return;
        }

        const postToSave = {
            ...formData,
            id: isEditing ? parseInt(id) : undefined,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            date: format(formData.date, 'MMM d, yyyy') // Format back to string for storage
        };

        savePost(postToSave);
        toast({ title: "Success", description: "Tutorial saved successfully." });
        navigate('/admin');
    };

    return (
        <TooltipProvider>
            <Helmet>
                <title>{isEditing ? 'Edit Tutorial' : 'New Tutorial'} - rifspace Admin</title>
            </Helmet>

            <div className="min-h-screen bg-[#0a0a0a] flex flex-col h-screen overflow-hidden">
                {/* 1. Header with Title */}
                <div className="bg-[#1a1a1a] border-b border-white/10 shrink-0 z-20">
                    <div className="flex items-center justify-between px-4 h-16">
                        <div className="flex items-center gap-4">
                            <Link to="/admin">
                                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div className="h-8 w-px bg-white/10 mx-2" />
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="bg-transparent text-white font-black text-xl uppercase tracking-tight outline-none placeholder-white/20 w-64 md:w-96"
                                placeholder="Untitled Tutorial"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPreview(!showPreview)}
                                className={`gap-2 ${showPreview ? 'text-[#3cbeee] bg-[#3cbeee]/10' : 'text-white/60'}`}
                            >
                                {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                <span className="hidden md:inline font-bold text-xs uppercase">Preview</span>
                            </Button>
                        </div>
                    </div>

                    {/* 2. Metadata Bar */}
                    <div className="px-4 py-2 border-t border-white/5 flex flex-wrap items-center gap-4 text-sm bg-[#0a0a0a]/50">
                        {/* Author */}
                        <div className="flex items-center gap-2 text-white/60">
                            <User className="w-3 h-3" />
                            <input
                                className="bg-transparent outline-none w-24 text-white font-medium"
                                value={formData.author}
                                onChange={(e) => handleChange('author', e.target.value)}
                                placeholder="Author"
                            />
                        </div>

                        {/* Date Picker */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="flex items-center gap-2 text-white/60 hover:text-[#3cbeee] transition-colors">
                                    <CalendarIcon className="w-3 h-3" />
                                    <span className="text-white font-medium">{format(formData.date, 'MMM d, yyyy')}</span>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={formData.date}
                                    onSelect={(date) => handleChange('date', date || new Date())}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        {/* Category */}
                        <div className="flex items-center gap-2 text-white/60">
                            <Tag className="w-3 h-3" />
                            <input
                                className="bg-transparent outline-none w-32 text-white font-medium"
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                placeholder="Category"
                            />
                        </div>

                        {/* Image URL (Drag & Drop zone wrapper) */}
                        <div
                            className={`flex items-center gap-2 flex-1 relative group cursor-pointer border border-dashed border-white/10 rounded px-3 py-1 transition-colors ${isCoverDragActive ? 'bg-[#3cbeee]/10 border-[#3cbeee]' : 'hover:bg-white/5 hover:border-white/20'}`}
                            {...getCoverRootProps()}
                        >
                            <ImageIcon className={`w-3 h-3 ${isCoverDragActive ? 'text-[#3cbeee]' : 'text-white/60'}`} />
                            {/* Hidden input for drag drop */}
                            <input {...getCoverInputProps()} />

                            <span className={`text-xs font-medium truncate ${formData.image ? 'text-white' : 'text-white/40'}`}>
                                {isCoverDragActive ? 'Drop image here (16:9)' : (formData.image ? 'Change Cover Image' : 'Upload Cover (16:9)')}
                            </span>

                            {isCoverDragActive && (
                                <div className="absolute inset-0 bg-[#3cbeee]/20 border border-[#3cbeee] flex items-center justify-center text-[#3cbeee] text-xs font-bold uppercase backdrop-blur-sm rounded">
                                    Release to Upload
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Excerpt Field */}
                    <div className="px-4 py-2 border-t border-white/5 bg-[#0a0a0a]/30">
                        <textarea
                            className="w-full bg-transparent text-white/80 text-sm outline-none resize-none placeholder-white/20"
                            rows={2}
                            placeholder="Write a short excerpt..."
                            value={formData.excerpt}
                            onChange={(e) => handleChange('excerpt', e.target.value)}
                        />
                    </div>

                    {/* 3. Toolbar (Rich Text) */}
                    <div className="px-4 py-2 border-t border-white/10 flex items-center gap-1 bg-[#1a1a1a]">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => insertMarkdown('h2')} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10"><Type className="w-4 h-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>Heading 2</TooltipContent>
                        </Tooltip>

                        <div className="w-px h-4 bg-white/10 mx-1" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => insertMarkdown('bold')} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10"><Bold className="w-4 h-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>Bold</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => insertMarkdown('italic')} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10"><Italic className="w-4 h-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>Italic</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => insertMarkdown('link')} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10"><LinkIcon className="w-4 h-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>Link</TooltipContent>
                        </Tooltip>

                        <div className="w-px h-4 bg-white/10 mx-1" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => insertMarkdown('list')} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10"><List className="w-4 h-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>List</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => insertMarkdown('quote')} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10"><Quote className="w-4 h-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>Quote</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => insertMarkdown('code')} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10"><Code className="w-4 h-4" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>Code Block</TooltipContent>
                        </Tooltip>

                        <div className="ml-auto flex items-center gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={handleUndo} disabled={historyIndex <= 0} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10 disabled:opacity-30"><Undo className="w-4 h-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>Undo</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="h-8 w-8 text-white/70 hover:text-[#3cbeee] hover:bg-[#3cbeee]/10 disabled:opacity-30"><Redo className="w-4 h-4" /></Button>
                                </TooltipTrigger>
                                <TooltipContent>Redo</TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                {/* 4. Main Work Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Editor */}
                    <div className={`flex-1 flex flex-col h-full bg-[#0a0a0a] relative transition-all duration-300 ${showPreview ? 'w-1/2 border-r border-white/10' : 'w-full'}`}>
                        {/* Dropzone for content images could be added here, simplified for now to just cover */}
                        <textarea
                            id="markdown-editor"
                            className="flex-1 w-full bg-[#0a0a0a] text-white p-8 resize-none outline-none font-mono text-sm leading-relaxed"
                            placeholder="# Start writing your masterpiece..."
                            value={formData.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 text-xs font-bold text-white/20 uppercase pointer-events-none">
                            Markdown
                        </div>
                    </div>

                    {/* Preview (Improved) */}
                    {showPreview && (
                        <div className="flex-1 h-full bg-[#0a0a0a] overflow-y-auto custom-scrollbar border-l border-white/5">
                            <article className="max-w-4xl mx-auto p-12 scale-[0.85] origin-top">
                                {/* Header Preview */}
                                <div className="mb-12">
                                    <span className="bg-[#3cbeee] text-black px-3 py-1 font-black text-xs uppercase tracking-wider inline-block mb-6">
                                        {formData.category || 'Category'}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 leading-tight">
                                        {formData.title || 'Untitled Title'}
                                    </h1>
                                    <p className="text-xl text-white/60 mb-8 font-medium leading-relaxed">
                                        {formData.excerpt || 'No excerpt provided.'}
                                    </p>
                                    <div className="flex items-center justify-between border-y border-white/10 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#1a1a1a] rounded-full border border-white/20 flex items-center justify-center">
                                                <User className="w-5 h-5 text-[#3cbeee]" />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm uppercase">Written by</div>
                                                <div className="text-[#3cbeee] font-black">{formData.author}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Preview */}
                                <div className="mb-12 border-4 border-white/10 aspect-video overflow-hidden">
                                    <img alt={formData.imageAlt} className="w-full h-full object-cover" src={formData.image} />
                                </div>

                                {/* Content Preview */}
                                <div className="prose prose-invert prose-lg max-w-none 
                                    prose-headings:font-black prose-headings:uppercase prose-headings:text-white
                                    prose-h3:text-[#3cbeee] prose-h3:text-2xl prose-h3:mt-8
                                    prose-p:text-white/80 prose-p:leading-relaxed
                                    prose-blockquote:border-l-4 prose-blockquote:border-[#3cbeee] prose-blockquote:bg-[#1a1a1a] prose-blockquote:p-6 prose-blockquote:not-italic
                                    prose-strong:text-white
                                    prose-a:text-[#3cbeee] prose-a:no-underline hover:prose-a:underline
                                    prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                                    prose-code:text-[#3cbeee] prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                    prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:w-full prose-img:object-cover prose-img:shadow-2xl">
                                    <ReactMarkdown>{formData.content}</ReactMarkdown>
                                </div>
                            </article>
                        </div>
                    )}
                </div>

                {/* 5. Bottom Action Bar (Sticky Save) */}
                <div className="border-t border-white/10 bg-[#1a1a1a] p-4 flex items-center justify-between shrink-0 z-30">
                    <div className="text-white/40 text-xs font-bold uppercase">
                        {isEditing ? 'Editing Mode' : 'Creation Mode'}
                    </div>
                    <Button onClick={handleSave} className="bg-[#3cbeee] text-black hover:bg-[#3cbeee] hover:opacity-90 font-black uppercase tracking-wider gap-2 px-8">
                        <Save className="w-4 h-4" />
                        Save Post
                    </Button>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default AdminEditorPage;
