export const storeRoute = (name) => {
    name = name.trim();
    let routeName = name.replace(/\s+/g, '-').toLowerCase();
    routeName = routeName.replace(/[^\w-]+/g, '');
    routeName = routeName.replace(/-{2,}/g, '-');
    const randomNumber = Math.floor(Math.random() * 100);
    routeName += `-${randomNumber}`;
    return routeName;
}