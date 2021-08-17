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

    it('should configure flex with row', () => {
        expect(styles.configureFlex("row")).toEqual(["display:flex;flex:1;flex-direction:row;", " flex-direction:", "row", ";justify-content:", "center", ";align-items:", "center", ";align-content:", "center", ";flex-basis:", "0", ";flex-grow:", "1", ";flex-shrink:", "0", ";",])
    })

    it('should configure flex with column', () => {
        expect(styles.configureFlex("column")).toEqual(["display:flex;flex:1;flex-direction:column;", " flex-direction:", "column", ";justify-content:", "center", ";align-items:", "center", ";align-content:", "center", ";flex-basis:", "0", ";flex-grow:", "1", ";flex-shrink:", "0", ";",])
    })
    
})