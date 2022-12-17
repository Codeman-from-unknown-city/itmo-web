export default function currentPage() {
    let basename = document.location.href.split('/').at(-1);
    let [name, _] = basename.split('.');

    return name;
}
