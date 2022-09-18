use std::error::Error;

pub type WingIIErr = Box<dyn Error>;
pub type WingIIOk<T> = Result<T, WingIIErr>;
pub type WingIIResult<T> = WingIIOk<T>;
pub type WingIIResultVoid = WingIIOk<()>;
