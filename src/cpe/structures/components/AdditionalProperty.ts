export class AdditionalProperty {
    private id?: string;
    private name?: string;
    private value?: string;

    get Id(): string {
        return this.id;
    }
    set Id(id: string) {
        this.id = id;
    }

    get Name(): string {
        return this.name;
    }
    set Name(name: string) {
        this.name = name;
    }

    get Value(): string {
        return this.value;
    }
    set Value(value: string) {
        this.value = value;
    }
}
