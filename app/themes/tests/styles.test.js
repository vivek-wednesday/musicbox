import styles from "../styles";

describe('styles', () => {
    it('should create text ellipsis', () => {
        expect(styles.textEllipsis()).toEqual(["white-space:nowrap;overflow:hidden;width:", "200px", ";text-overflow:ellipsis;"])
    })

    it('should create primary icon styles', () => {
        expect(styles.primaryIcon()).toEqual(["font-size:40px !important;color:", "#F8C410", " !important;"])
    })

    it('should create secondary icon styles', () => {
        expect(styles.secondaryIcon()).toEqual(["font-size:35px !important;color:", "#F8C49C", " !important;"])
    })

    it('should create disabled icon styles', () => {
        expect(styles.disabledIcon()).toEqual(["font-size:40px !important;"])
    })
    
})