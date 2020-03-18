<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\Preprocessing\Imputer\Strategy;

use App\Bnpb\Phpml\Math\Statistic\Mean;
use App\Bnpb\Phpml\Preprocessing\Imputer\Strategy;

class MedianStrategy implements Strategy
{
    public function replaceValue(array $currentAxis): float
    {
        return Mean::median($currentAxis);
    }
}
