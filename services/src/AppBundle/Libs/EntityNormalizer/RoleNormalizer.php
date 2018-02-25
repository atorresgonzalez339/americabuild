<?php

namespace AppBundle\Libs\EntityNormalizer;

use AppBundle\Libs\Normalizer\AbstractNormalizer;
use AppBundle\Libs\Decorator\CustomDecorator;

/**
 * Description of RoleNormalizer
 *
 * @author code
 */
class RoleNormalizer extends AbstractNormalizer {

    public function normalizeObject($object, $prototype) {

        $obj = array();
        switch ($prototype) {
            case CustomDecorator::DEFAULT_DECORATOR:
                $obj['id'] = $object->getId();
                $obj['name'] = $object->getRolname();
                $obj['description'] = $object->getDescription();
                $obj['alias'] = $object->getAlias();
                break;
        }

        return $obj;
    }
}
