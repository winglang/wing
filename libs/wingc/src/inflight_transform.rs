use crate::fold::Fold;

pub struct InflightTransformer;

impl InflightTransformer {
	pub fn new() -> Self {
		Self
	}
}

impl Fold for InflightTransformer {}
