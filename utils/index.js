//utils > index.js
import { format } from 'date-fns';

export function CurrentDateTime() {
    const currentDate = new Date();
    // const options = { timeZone: 'Asia/Jakarta' };

    const year = currentDate.toLocaleString('en-US', { year: 'numeric', timeZone: 'UTC' });
    const month = String(currentDate.toLocaleString('en-US', { month: '2-digit', timeZone: 'UTC' })).padStart(2, '0');
    const day = String(currentDate.toLocaleString('en-US', { day: '2-digit', timeZone: 'UTC' })).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

export function formatDate(date, formatType) {
    let formattedDate = '';
    switch (formatType) {
        case 'type1':
            formattedDate = format(date, 'dd-MM-yyyy', { timeZone: 'Asia/Jakarta' });
            break;
        case 'type2':
            formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Jakarta' });
            break;
        case 'type3':
            formattedDate = format(date, 'MMM-dd', { timeZone: 'Asia/Jakarta' });
            break;
        case 'type4':
            formattedDate = format(date, 'yyyy-MM-dd', { timeZone: 'Asia/Jakarta' });
            break;
        case 'type5':
            formattedDate = format(date, 'dd-MMM-yyy', { timeZone: 'Asia/Jakarta' });
            break;
        case 'type6':
            formattedDate = format(date, 'dd MMM', { timeZone: 'Asia/Jakarta' });
            break;
        default:
            formattedDate = '';
            break;
    }
    return formattedDate;
}

export function getDueDateClass(dueDate, diffDate) {
    const currentDate = new Date();
    const date = new Date(dueDate);
    const diffTime = date - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return 'text-red-500 blink'; // Overdue
    } else if (diffDays <= diffDate) {
        return 'text-orange-500 blink'; // Due soon
    } else {
        return 'text-grey-800';
    }
}


export function formatCurrency(value) {
    const numericValue = typeof value === 'number' ? value : parseFloat(value);

    const formattedCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(numericValue);

    return formattedCurrency;
}

export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
export function statusColors(status) {
    const colorMap = {
        complete: '#28a745',
        dueDate: '#FF5252',
        pending: '#FFD952',
        doing: '#17a2b8',
        active: '#28a745',
        Publish: '#28a745',
        Inactive: '#ff0000'
    };

    return colorMap[status] || '#6c757d';
}


export function getFileIcon(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();

    const icons = {
        'jpg': 'icon-image.png',
        'jpeg': 'icon-image.png',
        'png': 'icon-image.png',
        'doc': 'icon-word.png',
        'docx': 'icon-word.png',
        'pdf': 'icon-pdf.png',
        'xls': 'icon-excel.png',
        'xlsx': 'icon-excel.png',
        'txt': 'icon-text.png',
    };
    return icons[extension] || 'icon-text.png';
}



