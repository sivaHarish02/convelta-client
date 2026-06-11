export interface ToolOption {
    id: string;
    name: string;
    type: 'number' | 'text' | 'select' | 'checkbox';
    defaultValue?: any;
    options?: { label: string; value: string }[];
    placeholder?: string;
}

export interface Tool {
    id: string;
    name: string;
    slug: string;
    category: 'data' | 'image' | 'document' | 'business' | 'developer';
    description: string;
    inputFormat: string[];
    outputFormat: string;
    icon: string;
    features: string[];
    inputType?: 'single-file' | 'multi-file' | 'text' | 'file-or-text';
    options?: ToolOption[];
    seoTitle?: string;
    seoDescription?: string;
    faq?: { question: string; answer: string }[];
    relatedTools?: string[];
}

export const tools: Tool[] = [
    // Data Converters
    {
        id: 'json-to-excel',
        name: 'JSON to Excel',
        slug: 'json-to-excel',
        category: 'data',
        description: 'Convert JSON files or text to Excel spreadsheets',
        inputFormat: ['.json', 'JSON text'],
        outputFormat: '.xlsx',
        icon: 'FileJson',
        features: ['Upload JSON file', 'Paste JSON text', 'Auto formatting', 'Column headers']
    },
    {
        id: 'excel-to-json',
        name: 'Excel to JSON',
        slug: 'excel-to-json',
        category: 'data',
        description: 'Convert Excel spreadsheets to JSON format',
        inputFormat: ['.xlsx', '.xls'],
        outputFormat: '.json',
        icon: 'FileSpreadsheet',
        features: ['Support multiple sheets', 'Auto detection', 'Download JSON', 'Live preview']
    },
    {
        id: 'csv-to-json',
        name: 'CSV to JSON',
        slug: 'csv-to-json',
        category: 'data',
        description: 'Convert CSV files to JSON format instantly',
        inputFormat: ['.csv'],
        outputFormat: '.json',
        icon: 'FileText',
        features: ['Header detection', 'Custom separators', 'Download JSON', 'Quick conversion']
    },
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        slug: 'json-formatter',
        category: 'data',
        description: 'Format and validate JSON with proper indentation',
        inputFormat: ['JSON text'],
        outputFormat: '.json',
        icon: 'Braces',
        features: ['Format JSON', 'Validate syntax', 'Copy formatted', 'Download file']
    },
    {
        id: 'json-to-csv',
        name: 'JSON to CSV',
        slug: 'json-to-csv',
        category: 'data',
        description: 'Convert JSON files or text directly to CSV format',
        inputFormat: ['.json', 'JSON text'],
        outputFormat: '.csv',
        icon: 'FileText',
        features: ['Convert pasted JSON or .json file', 'Detect key headers', 'Auto formatting', 'Instant CSV download'],
        inputType: 'file-or-text'
    },
    {
        id: 'csv-to-excel',
        name: 'CSV to Excel',
        slug: 'csv-to-excel',
        category: 'data',
        description: 'Convert CSV tables to Excel spreadsheets',
        inputFormat: ['.csv'],
        outputFormat: '.xlsx',
        icon: 'FileSpreadsheet',
        features: ['Convert CSV sheets', 'Support multiple delimiters', 'Clean layout styling', 'Quick .xlsx output'],
        inputType: 'single-file'
    },
    {
        id: 'excel-to-csv',
        name: 'Excel to CSV',
        slug: 'excel-to-csv',
        category: 'data',
        description: 'Convert Excel spreadsheet sheets to CSV text',
        inputFormat: ['.xlsx', '.xls'],
        outputFormat: '.csv',
        icon: 'FileText',
        features: ['Support Excel worksheets', 'Export active sheets', 'Custom output formatting', 'Instant conversion'],
        inputType: 'single-file'
    },
    {
        id: 'xml-to-json',
        name: 'XML to JSON',
        slug: 'xml-to-json',
        category: 'data',
        description: 'Convert XML tags structure to formatted JSON code',
        inputFormat: ['.xml', 'XML text'],
        outputFormat: '.json',
        icon: 'Braces',
        features: ['Convert XML data tags', 'Upload xml file or paste code', 'Nested object creation', 'Indented structure'],
        inputType: 'file-or-text'
    },
    {
        id: 'json-to-sql',
        name: 'JSON to SQL',
        slug: 'json-to-sql',
        category: 'data',
        description: 'Convert JSON array or object data into SQL INSERT queries with custom table name and database style options.',
        inputFormat: ['.json', 'JSON text'],
        outputFormat: '.sql',
        icon: 'Database',
        features: ['Upload JSON or paste code', 'Custom table name', 'Support MySQL, PostgreSQL, SQLite', 'Bulk insert generation'],
        inputType: 'file-or-text',
        seoTitle: 'JSON to SQL Converter - Free Online Tool | Convelta',
        seoDescription: 'Convert JSON data into SQL INSERT queries online for free. Support for MySQL, PostgreSQL, and SQLite with custom table configurations.',
        options: [
            {
                id: 'tableName',
                name: 'Table Name',
                type: 'text',
                defaultValue: 'users',
                placeholder: 'e.g. users'
            },
            {
                id: 'sqlType',
                name: 'SQL Type',
                type: 'select',
                defaultValue: 'MySQL',
                options: [
                    { label: 'MySQL', value: 'MySQL' },
                    { label: 'PostgreSQL', value: 'PostgreSQL' },
                    { label: 'SQLite', value: 'SQLite' }
                ]
            },
            {
                id: 'insertMode',
                name: 'Insert Mode',
                type: 'select',
                defaultValue: 'Bulk INSERT',
                options: [
                    { label: 'Bulk INSERT', value: 'Bulk INSERT' },
                    { label: 'Single INSERT per row', value: 'Single INSERT per row' }
                ]
            },
            {
                id: 'includeCreateTable',
                name: 'Include CREATE TABLE',
                type: 'checkbox',
                defaultValue: false
            },
            {
                id: 'quoteColumns',
                name: 'Quote column names',
                type: 'checkbox',
                defaultValue: true
            }
        ]
    },

    // Image Converters
    {
        id: 'any-image-converter',
        name: 'Any Image Converter',
        slug: 'any-image-converter',
        category: 'image',
        description: 'Convert JPG, PNG, WEBP, or SVG images to PNG, JPG, or WEBP with custom size, quality, and background options.',
        inputFormat: ['.jpg', '.jpeg', '.png', '.webp', '.svg'],
        outputFormat: '.png, .jpg, .webp',
        icon: 'Image',
        features: ['Convert multiple formats', 'Resize images', 'Maintain aspect ratio', 'Custom background', 'Quality control'],
        inputType: 'single-file',
        seoTitle: 'Any Image Converter - Convert JPG, PNG, WEBP, SVG Online | Convelta',
        seoDescription: 'Convert images between JPG, PNG, WEBP, and SVG online for free. Choose output format, size, quality, and background color with Convelta.',
        faq: [
            { question: 'Which image formats are supported?', answer: 'We currently support JPG, JPEG, PNG, WEBP, and SVG as input formats, and you can convert them to PNG, JPG, or WEBP.' },
            { question: 'Can I convert PNG to JPG?', answer: 'Yes! Just upload your PNG file, select JPG as the output format, and we will handle the conversion instantly.' },
            { question: 'Can I convert SVG to PNG?', answer: 'Yes, our Any Image Converter fully supports SVG to PNG conversion, making it easy to rasterize vector graphics.' },
            { question: 'Why does JPG need a background color?', answer: 'The JPG format does not support transparency. If you convert an image with a transparent background (like PNG or SVG) to JPG, you need a solid background color to replace the transparency.' },
            { question: 'Can I resize while converting?', answer: 'Absolutely! You can provide a custom width or height, and choose whether to maintain the original aspect ratio.' },
            { question: 'Are my files safe?', answer: 'Yes, your uploaded images are processed securely on our servers and are automatically deleted immediately after conversion. We do not store or share your files.' }
        ],
        relatedTools: [
            'image-compressor',
            'image-resizer',
            'svg-converter',
            'png-to-webp',
            'jpg-to-png',
            'png-to-jpg',
            'webp-to-png'
        ],
        options: [
            {
                id: 'outputFormat',
                name: 'Output Format',
                type: 'select',
                defaultValue: 'png',
                options: [
                    { label: 'PNG', value: 'png' },
                    { label: 'JPG', value: 'jpg' },
                    { label: 'WEBP', value: 'webp' }
                ]
            },
            {
                id: 'width',
                name: 'Width (px)',
                type: 'number',
                placeholder: 'Auto'
            },
            {
                id: 'height',
                name: 'Height (px)',
                type: 'number',
                placeholder: 'Auto'
            },
            {
                id: 'maintainAspectRatio',
                name: 'Maintain aspect ratio',
                type: 'checkbox',
                defaultValue: true
            },
            {
                id: 'backgroundColor',
                name: 'Background Color',
                type: 'select',
                defaultValue: 'transparent',
                options: [
                    { label: 'Transparent', value: 'transparent' },
                    { label: 'White', value: '#ffffff' },
                    { label: 'Black', value: '#000000' },
                    { label: 'Red', value: '#ff0000' },
                    { label: 'Green', value: '#00ff00' },
                    { label: 'Blue', value: '#0000ff' },
                    { label: 'Yellow', value: '#ffff00' }
                ]
            },
            {
                id: 'quality',
                name: 'Quality Percentage',
                type: 'number',
                defaultValue: 90,
                placeholder: 'Quality (10-100)'
            }
        ]
    },
    {
        id: 'jpg-to-png',
        name: 'JPG to PNG',
        slug: 'jpg-to-png',
        category: 'image',
        description: 'Convert JPG/JPEG images to PNG format with transparency',
        inputFormat: ['.jpg', '.jpeg'],
        outputFormat: '.png',
        icon: 'Image',
        features: ['Preserve quality', 'Transparency support', 'Instant conversion', 'Download result']
    },
    {
        id: 'png-to-jpg',
        name: 'PNG to JPG',
        slug: 'png-to-jpg',
        category: 'image',
        description: 'Convert PNG images to JPG format for smaller file size',
        inputFormat: ['.png'],
        outputFormat: '.jpg',
        icon: 'Image',
        features: ['Quality control', 'Smaller filesize', 'Batch conversion', 'Download result']
    },
    {
        id: 'webp-to-png',
        name: 'WEBP to PNG',
        slug: 'webp-to-png',
        category: 'image',
        description: 'Convert WEBP images to PNG format',
        inputFormat: ['.webp'],
        outputFormat: '.png',
        icon: 'Image',
        features: ['Modern format support', 'Resolution preserved', 'Instant conversion', 'Safe format']
    },
    {
        id: 'png-to-webp',
        name: 'PNG to WEBP',
        slug: 'png-to-webp',
        category: 'image',
        description: 'Convert PNG images to WEBP for modern web',
        inputFormat: ['.png'],
        outputFormat: '.webp',
        icon: 'Image',
        features: ['Reduce size', 'Web optimized', 'Quality maintained', 'Modern format']
    },
    {
        id: 'jpg-to-webp',
        name: 'JPG to WEBP',
        slug: 'jpg-to-webp',
        category: 'image',
        description: 'Convert JPG/JPEG images to WEBP format for modern web performance',
        inputFormat: ['.jpg', '.jpeg'],
        outputFormat: '.webp',
        icon: 'Image',
        features: ['Reduce size', 'Quality control', 'Instant conversion', 'Web optimized'],
        seoTitle: 'JPG to WEBP Converter - Free Online Tool | Convelta',
        seoDescription: 'Convert JPG or JPEG images to WEBP online for free with Convelta. Upload your image, convert instantly, and download WEBP files.',
        faq: [
            { question: 'Can I convert JPG to WEBP for free?', answer: 'Yes, Convelta provides a 100% free JPG to WEBP converter with no hidden fees or signup requirements.' },
            { question: 'Does WEBP reduce image size?', answer: 'Absolutely. WEBP is a modern image format that provides superior lossless and lossy compression, often reducing file sizes by up to 34% compared to standard JPGs.' },
            { question: 'Is image quality preserved?', answer: 'Yes! You can use the built-in quality slider to adjust the compression level, allowing you to find the perfect balance between file size and visual quality.' },
            { question: 'Are uploaded images stored?', answer: 'No, all files uploaded to Convelta are automatically deleted from our secure servers immediately after the conversion process completes.' },
            { question: 'Can I download the converted WEBP file?', answer: 'Yes, once the conversion finishes, you will immediately receive a secure download link to save the WEBP file to your device.' }
        ],
        inputType: 'single-file',
        options: [
            {
                id: 'quality',
                name: 'Quality Percentage',
                type: 'number',
                defaultValue: 90,
                placeholder: 'Quality (10-100)'
            }
        ]
    },
    {
        id: 'image-compressor',
        name: 'Image Compressor',
        slug: 'image-compressor',
        category: 'image',
        description: 'Compress image files while preserving clarity and resolution',
        inputFormat: ['.jpg', '.jpeg', '.png', '.webp'],
        outputFormat: 'Image',
        icon: 'Image',
        features: ['Resize/Compress single images', 'Lossless compression options', 'Before/After preview', 'Adjust quality compression percentage'],
        inputType: 'single-file',
        options: [
            {
                id: 'quality',
                name: 'Quality Percentage',
                type: 'number',
                defaultValue: 80,
                placeholder: 'Quality (1-100)'
            }
        ]
    },
    {
        id: 'image-resizer',
        name: 'Image Resizer',
        slug: 'image-resizer',
        category: 'image',
        description: 'Resize image dimensions by width and height',
        inputFormat: ['.jpg', '.jpeg', '.png', '.webp'],
        outputFormat: 'Image',
        icon: 'Image',
        features: ['Set custom pixel dimensions', 'Maintain aspect ratio options', 'High quality rendering', 'Support JPG, PNG, WEBP'],
        inputType: 'single-file',
        options: [
            {
                id: 'width',
                name: 'Width (px)',
                type: 'number',
                defaultValue: 800,
                placeholder: 'e.g. 800'
            },
            {
                id: 'height',
                name: 'Height (px)',
                type: 'number',
                defaultValue: 600,
                placeholder: 'e.g. 600'
            },
            {
                id: 'maintainAspectRatio',
                name: 'Maintain Aspect Ratio',
                type: 'checkbox',
                defaultValue: true
            }
        ]
    },
    {
        id: 'batch-image-compressor',
        name: 'Batch Image Compressor',
        slug: 'batch-image-compressor',
        category: 'image',
        description: 'Compress multiple images in batch and download as a ZIP file',
        inputFormat: ['.jpg', '.jpeg', '.png', '.webp'],
        outputFormat: '.zip',
        icon: 'Image',
        features: ['Process multiple files at once', 'Vibrant progress feedback', 'High speed optimization', 'Download packed ZIP folder'],
        inputType: 'multi-file',
        options: [
            {
                id: 'quality',
                name: 'Quality Percentage',
                type: 'number',
                defaultValue: 75,
                placeholder: 'Quality (1-100)'
            }
        ]
    },
    {
        id: 'svg-converter',
        name: 'SVG Converter',
        slug: 'svg-converter',
        category: 'image',
        description: 'Convert SVG files to PNG, JPG, or WEBP with custom size and quality options.',
        inputFormat: ['.svg'],
        outputFormat: '.png, .jpg, .webp',
        icon: 'Image',
        features: ['Format conversion', 'Custom dimensions', 'Background color', 'Quality control'],
        inputType: 'single-file',
        options: [
            {
                id: 'outputFormat',
                name: 'Output Format',
                type: 'select',
                defaultValue: 'png',
                options: [
                    { label: 'PNG', value: 'png' },
                    { label: 'JPG', value: 'jpg' },
                    { label: 'WEBP', value: 'webp' }
                ]
            },
            {
                id: 'width',
                name: 'Width (px)',
                type: 'number',
                placeholder: 'e.g. 1024'
            },
            {
                id: 'height',
                name: 'Height (px)',
                type: 'number',
                placeholder: 'e.g. 1024'
            },
            {
                id: 'backgroundColor',
                name: 'Background Color',
                type: 'text',
                placeholder: 'e.g. white or transparent'
            },
            {
                id: 'quality',
                name: 'Quality Percentage',
                type: 'number',
                defaultValue: 90,
                placeholder: 'Quality (10-100)'
            }
        ]
    },

    // Document Converters
    {
        id: 'image-to-pdf',
        name: 'Image to PDF',
        slug: 'image-to-pdf',
        category: 'document',
        description: 'Convert images to PDF documents',
        inputFormat: ['.jpg', '.jpeg', '.png'],
        outputFormat: '.pdf',
        icon: 'FileImage',
        features: ['Multiple images', 'Auto sizing', 'Margin control', 'Download PDF']
    },
    {
        id: 'text-to-pdf',
        name: 'Text to PDF',
        slug: 'text-to-pdf',
        category: 'document',
        description: 'Convert plain text to PDF documents',
        inputFormat: ['Text content'],
        outputFormat: '.pdf',
        icon: 'FileText',
        features: ['Format text', 'Custom fonts', 'Page breaks', 'Download PDF']
    },
    {
        id: 'images-to-pdf',
        name: 'Multiple Images to PDF',
        slug: 'images-to-pdf',
        category: 'document',
        description: 'Convert multiple images into a structured PDF document',
        inputFormat: ['.jpg', '.jpeg', '.png'],
        outputFormat: '.pdf',
        icon: 'FileImage',
        features: ['Select multiple image formats', 'Drag to reorder sheets', 'Page orientation configurations', 'High fidelity output'],
        inputType: 'multi-file',
        options: [
            {
                id: 'orientation',
                name: 'Page Orientation',
                type: 'select',
                defaultValue: 'portrait',
                options: [
                    { label: 'Portrait', value: 'portrait' },
                    { label: 'Landscape', value: 'landscape' }
                ]
            },
            {
                id: 'margin',
                name: 'Page Margin',
                type: 'select',
                defaultValue: 'small',
                options: [
                    { label: 'None', value: 'none' },
                    { label: 'Small', value: 'small' },
                    { label: 'Large', value: 'large' }
                ]
            }
        ]
    },
    {
        id: 'pdf-to-jpg',
        name: 'PDF to JPG',
        slug: 'pdf-to-jpg',
        category: 'document',
        description: 'Extract pages of a PDF document as separate JPG images',
        inputFormat: ['.pdf'],
        outputFormat: '.zip',
        icon: 'FileImage',
        features: ['Convert entire PDF files', 'Each page saved to high resolution JPG', 'Download zipped archive files', 'Instant visual conversion feedback'],
        inputType: 'single-file',
        options: [
            {
                id: 'quality',
                name: 'Image Quality (1-100)',
                type: 'number',
                defaultValue: 90,
                placeholder: 'Quality (1-100)'
            }
        ]
    },

    // Business Tools
    {
        id: 'whatsapp-contact-cleaner',
        name: 'WhatsApp Contact Cleaner',
        slug: 'whatsapp-contact-cleaner',
        category: 'business',
        description: 'Cleanse and reformat phone contacts list for bulk WhatsApp campaigns',
        inputFormat: ['.xlsx', '.xls', '.csv'],
        outputFormat: '.xlsx',
        icon: 'FileSpreadsheet',
        features: ['Cleanse phone numbers', 'Auto append missing country codes', 'Filter invalid/empty records', 'Download formatted sheet'],
        inputType: 'single-file',
        options: [
            {
                id: 'mobileColumn',
                name: 'Mobile Column Name (Optional)',
                type: 'text',
                defaultValue: '',
                placeholder: 'e.g. phone'
            },
            {
                id: 'defaultCountryCode',
                name: 'Default Country Code',
                type: 'text',
                defaultValue: '91',
                placeholder: 'e.g. 91'
            },
            {
                id: 'removeDuplicates',
                name: 'Remove Duplicates',
                type: 'checkbox',
                defaultValue: true
            }
        ]
    },

    // Developer Tools
    {
        id: 'json-to-dart-model',
        name: 'JSON to Dart Model',
        slug: 'json-to-dart-model',
        category: 'developer',
        description: 'Convert JSON objects into Flutter / Dart model classes',
        inputFormat: ['JSON text'],
        outputFormat: '.dart',
        icon: 'Braces',
        features: ['Transform raw JSON payloads', 'Generates class maps & model models', 'Auto generates serializers', 'Secure instant output'],
        inputType: 'text',
        options: [
            {
                id: 'className',
                name: 'Class Name',
                type: 'text',
                defaultValue: 'AutogeneratedModel',
                placeholder: 'Model name'
            },
            {
                id: 'serializers',
                name: 'Generate JSON Serializers',
                type: 'checkbox',
                defaultValue: true
            }
        ]
    },
    {
        id: 'base64-encode-decode',
        name: 'Base64 Encode Decode',
        slug: 'base64-encode-decode',
        category: 'developer',
        description: 'Encode plain text to Base64 format or decode Base64 back',
        inputFormat: ['Text content'],
        outputFormat: 'Text',
        icon: 'Braces',
        features: ['Encode alphanumeric string', 'Decode encrypted Base64 string', 'Fast and safe processing', 'Direct text copier option'],
        inputType: 'text',
        options: [
            {
                id: 'action',
                name: 'Action Mode',
                type: 'select',
                defaultValue: 'encode',
                options: [
                    { label: 'Encode Text', value: 'encode' },
                    { label: 'Decode Base64', value: 'decode' }
                ]
            }
        ]
    },
    {
        id: 'bcrypt-hash-generator-verifier',
        name: 'Bcrypt Hash Generator & Verifier',
        slug: 'bcrypt-hash-generator-verifier',
        category: 'developer',
        description: 'Generate bcrypt password hashes and verify plain text passwords against bcrypt hashes securely in your browser.',
        inputFormat: ['Text content'],
        outputFormat: 'Text',
        icon: 'Lock',
        features: ['Generate hashes securely', 'Verify passwords against hashes', 'Adjustable salt rounds', 'Local browser execution', 'No backend data transfer'],
        inputType: 'text',
        seoTitle: 'Bcrypt Hash Generator & Verifier - Free Online Developer Tool | Convelta',
        seoDescription: 'Generate secure bcrypt hashes or verify passwords against existing bcrypt hashes. 100% free, safe, and runs entirely in your local browser.',
        faq: [
            { question: 'What is Bcrypt?', answer: 'Bcrypt is a secure password hashing function based on the Blowfish cipher. It incorporates a salt to protect against rainbow table attacks and is adaptive over time by increasing the iteration count (salt rounds).' },
            { question: 'How do I generate a hash?', answer: 'Enter your plain text password, select the number of salt rounds (default is 10), and click Generate. The tool will output the secure bcrypt hash.' },
            { question: 'Is this tool safe to use?', answer: 'Yes. This tool runs 100% locally in your browser. Your passwords and hashes are never sent to our servers. However, as a best practice, never enter your real production passwords on shared or public devices.' },
            { question: 'What are salt rounds?', answer: 'Salt rounds determine the computational cost of hashing the password. A higher number is more secure but takes longer to compute. 10 is the standard recommendation.' },
            { question: 'Can I decrypt a bcrypt hash?', answer: 'No. Bcrypt is a one-way hashing algorithm, meaning it cannot be decrypted back into plain text. You can only verify if a given password matches a specific hash.' }
        ]
    }
];

export const categories = [
    {
        id: 'data',
        name: 'Data Converters',
        slug: 'data',
        description: 'Convert between JSON, Excel, CSV and more',
        color: 'bg-sky-cyan'
    },
    {
        id: 'image',
        name: 'Image Converters',
        slug: 'image',
        description: 'Compress, resize and convert between image formats instantly',
        color: 'bg-peach-orange'
    },
    {
        id: 'document',
        name: 'Document Converters',
        slug: 'document',
        description: 'Generate PDFs from images and text',
        color: 'bg-light-aqua'
    },
    {
        id: 'business',
        name: 'Business Tools',
        slug: 'business',
        description: 'Tools designed to streamline your business workflow',
        color: 'bg-golden-sand'
    },
    {
        id: 'developer',
        name: 'Developer Tools',
        slug: 'developer',
        description: 'Useful utilities and generators for developers',
        color: 'bg-warm-beige'
    }
];

export function getToolBySlug(slug: string): Tool | undefined {
    return tools.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
    return tools.filter(tool => tool.category === category);
}

export function getRelatedTools(slug: string, limit = 6): Tool[] {
    const tool = getToolBySlug(slug);
    if (!tool) return [];

    let related: Tool[] = [];
    
    // 1. Add explicitly linked related tools first
    if (tool.relatedTools && tool.relatedTools.length > 0) {
        related = tool.relatedTools
            .map(s => getToolBySlug(s))
            .filter((t): t is Tool => t !== undefined && t.slug !== slug);
    }

    // 2. Backfill with tools from the same category if needed
    if (related.length < limit) {
        const categoryTools = getToolsByCategory(tool.category)
            .filter(t => t.slug !== slug && !related.find(r => r.slug === t.slug));
        related = [...related, ...categoryTools];
    }

    return related.slice(0, limit);
}

export const getIconEmoji = (slug: string): string => {
    const icons: { [key: string]: string } = {
        'json-to-excel': '📊',
        'excel-to-json': '📋',
        'csv-to-json': '📑',
        'json-formatter': '✨',
        'jpg-to-png': '🖼️',
        'png-to-jpg': '📷',
        'webp-to-png': '🌐',
        'png-to-webp': '⚡',
        'image-to-pdf': '🎨',
        'text-to-pdf': '📝',
        'image-compressor': '🗜️',
        'image-resizer': '📐',
        'batch-image-compressor': '📦',
        'images-to-pdf': '📕',
        'pdf-to-jpg': '📸',
        'json-to-csv': '🗂️',
        'csv-to-excel': '📈',
        'excel-to-csv': '📉',
        'xml-to-json': '⚙️',
        'whatsapp-contact-cleaner': '🧼',
        'json-to-dart-model': '🎯',
        'base64-encode-decode': '🔏',
        'json-to-sql': '🗄️',
        'bcrypt-hash-generator-verifier': '🔐',
    };
    return icons[slug] || '🔄';
};
