<?php

declare(strict_types=1);

namespace App\Bnpb\Phpml\Preprocessing\Imputer;

interface Strategy
{
    /**
     * @return mixed
     */
    public function replaceValue(array $currentAxis);
}
