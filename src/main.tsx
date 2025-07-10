import { createRoot } from 'react-dom/client';
import { Root } from '@/src/root';
import { getHTMLElement } from '@/src/utils';



createRoot(getHTMLElement.appRoot()).render(<Root/>);