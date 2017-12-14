import { ButtonComponent } from './button.component';
describe('ButtomComp', () => {
    let comp: ButtonComponent;

    beforeEach(() => comp = new ButtonComponent());

    it('#isOn should be false initially', () => {
        expect(comp.isOn).toBe(false);
    });

    it('#clicked() should set #isOn to true', () => {
        comp.clicked();
        expect(comp.isOn).toBe(true);
    });

    it('#clicked() should set #message to "is On"', () => {
        comp.clicked();
        expect(comp.message).toContain('is On');
    });

    it('#clicked() should toggle #isOn', () => {
        comp.clicked();
        expect(comp.isOn).toBe(true);
        comp.clicked();
        expect(comp.isOn).toBe(false);
    });
});