import React from 'react';
import '../css/BookViewer.css';
export interface BookViewer {
    pages: string[];
    children?: {
        Render: React.FC;
        height: string;
    };
    direction?: 'ltr' | 'rtl';
}
export declare const BookViewer: React.FC<BookViewer>;
