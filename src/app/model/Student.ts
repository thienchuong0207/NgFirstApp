import { GenderEnum } from '../util/GenderEnum';

export class Student {
    /* Properties */
    private id: number;
    private name: string;
    private gender: GenderEnum;
    private photo: string;
    private classId: number;
    /* Constructor */
    public constructor(id: number, name: string, gender: GenderEnum, photo: string, classId: number) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.photo = photo;
        this.classId = classId;
    }
    /* Getters and Setters */
    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getGender(): string {
        return this.gender == GenderEnum.FEMALE ? 'Nữ' : 'Nam';
    }
    public setGender(gender: GenderEnum): void {
        this.gender = gender;
    }
    public getPhoto(): string {
        return this.photo;
    }
    public setPhoto(photo: string): void {
        this.photo = photo;
    }
    public getClassId(): number {
        return this.classId;
    }
    public setClassId(classId: number): void {
        this.classId = classId;
    }
}