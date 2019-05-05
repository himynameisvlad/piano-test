export class TableSortOption {
    constructor(
        public title: string,
        public sortBy: string,
        public order: 'desc' | 'asc',
        public isSorted: boolean= false
    ) {}

    setIsSorted(isSorted: boolean) {
        this.isSorted = isSorted;
    }
}